const fs = require("fs");
const path = require("path");

const languages = [
	"javascript",
	"javascriptreact",
	"typescript",
	"typescriptreact",
];
const files = [
	"./snippets/components.code-snippets",
	"./snippets/imports.code-snippets",
	"./snippets/proptypes.code-snippets",
	"./snippets/react.code-snippets",
	"./snippets/reactdom.code-snippets",
];

const entries = languages.flatMap((lang) =>
	files.map((path) => ({ language: lang, path })),
);

const packagePath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

packageJson.contributes.snippets = entries;

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, "\t") + "\n");

console.log("✓ Updated package.json with generated snippet entries");
