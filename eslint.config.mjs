import { dirname } from "path";
import globals from "globals";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals"),
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    {
        languageOptions: {
            globals: {
                ...globals.browser, // browser globals
                ...globals.node, // Includes Node.js globals like Buffer and process
                require: true, // add 'require' for CommonJS
                __dirname: true, // add '__dirname' for Node.js environments
                module: true, // add 'module' for Node.js environments
                _: true,
            },
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            import: pluginImport,
        },
        rules: {
            "import/no-unresolved": [
                "error",
                { commonjs: true, caseSensitive: true },
            ],
            "react/react-in-jsx-scope": "off",
            "no-unused-vars": "off",
            "react/no-unknown-property": "off",
            "react/no-unescaped-entities": "off",
            "react/prop-types": "off",
            "no-case-declarations": "off",
        },
        settings: {
            "import/resolver": {
                alias: {
                    map: [
                        ["@", "./src"], // map @/* to ./src/*
                    ],
                    extensions: [".js", ".jsx", ".mjs", ".json"],
                },
            },
            react: {
                version: "detect",
            },
        },
    },
];

export default eslintConfig;
