import * as vscode from 'vscode';

interface ImportData {
    defaultImport: string;
    namedImports: Set<string>;
    lineIndices: number[];
}

export function activate(context: vscode.ExtensionContext) {
    // Renamed to snippetz.mergeImports to be generic and match extension ID
    let disposable = vscode.commands.registerCommand('snippetz.mergeImports', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const lineCount = document.lineCount;
        const groupImports = new Map<string, ImportData>();

        // Regex handles standard ES6 imports with flexible quoting and spacing
        const importPattern = /^\s*import\s+([\w\s,{}]+)\s+from\s+['"]([^'"]+)['"];?\s*$/;

        // 1. Collect all import statements and group them by package source
        for (let i = 0; i < lineCount; i++) {
            const line = document.lineAt(i);
            const match = line.text.match(importPattern);

            if (match) {
                const importsPart = match[1].trim();
                const source = match[2].trim();

                if (!groupImports.has(source)) {
                    groupImports.set(source, {
                        defaultImport: '',
                        namedImports: new Set<string>(),
                        lineIndices: []
                    });
                }

                const data = groupImports.get(source)!;
                data.lineIndices.push(i);

                if (importsPart.includes('{')) {
                    // Extract Named Imports
                    const namedMatch = importsPart.match(/\{([^}]+)\}/);
                    if (namedMatch) {
                        namedMatch[1].split(',').forEach(item => {
                            const trimmed = item.trim();
                            if (trimmed) data.namedImports.add(trimmed);
                        });
                    }
                    // Extract Default Import
                    const parts = importsPart.split('{');
                    const defaultPart = parts[0].replace(/[\s,]/g, '').trim();
                    if (defaultPart && !data.defaultImport) {
                        data.defaultImport = defaultPart;
                    }
                } else {
                    // Extract Default Import
                    const defaultPart = importsPart.replace(/[\s,]/g, '').trim();
                    if (defaultPart && !data.defaultImport) {
                        data.defaultImport = defaultPart;
                    }
                }
            }
        }

        let mergedCount = 0;

        // 2. Perform the edits atomically
        editor.edit(editBuilder => {
            groupImports.forEach((data, source) => {
                if (data.lineIndices.length > 1) {
                    mergedCount++;

                    // Construct the single merged import string
                    let mergedImport = 'import ';
                    if (data.defaultImport) {
                        mergedImport += data.defaultImport;
                        if (data.namedImports.size > 0) mergedImport += ', ';
                    }
                    if (data.namedImports.size > 0) {
                        const sorted = Array.from(data.namedImports).sort();
                        mergedImport += `{ ${sorted.join(', ')} }`;
                    }
                    mergedImport += ` from '${source}';`;

                    // Logic: Keep the first line found for the package and merge everything into it.
                    // Delete all subsequent lines for that same package.
                    data.lineIndices.forEach((lineIndex, idx) => {
                        const line = document.lineAt(lineIndex);
                        if (idx === 0) {
                            editBuilder.replace(line.range, mergedImport);
                        } else {
                            editBuilder.delete(line.rangeIncludingLineBreak);
                        }
                    });
                }
            });
        }).then(success => {
            if (success && mergedCount > 0) {
                vscode.window.showInformationMessage(`React Snippets: Successfully merged ${mergedCount} package groups.`);
            } else if (success && mergedCount === 0) {
                vscode.window.showInformationMessage('React Snippets: No redundant imports found to merge.');
            } else if (!success) {
                vscode.window.showErrorMessage('React Snippets: Failed to apply merged imports.');
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
