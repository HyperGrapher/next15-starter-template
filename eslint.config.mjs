/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: true,
        },
    },

    rules: {
        // "@typescript-eslint/non-nullable-type-assertion-style": "warn",
        // "@typescript-eslint/no-empty-object-type": "warn",
        // "@typescript-eslint/no-base-to-string": "warn",
        // "@typescript-eslint/no-unsafe-assignment": "warn",
        // "@typescript-eslint/no-unsafe-member-access": "warn",
        // "@typescript-eslint/no-unsafe-argument": "warn",
        // "@typescript-eslint/no-unsafe-return": "warn",
        // "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        // "@typescript-eslint/prefer-optional-chain": "warn",
        // "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",

        "@typescript-eslint/consistent-type-imports": ["warn", {
            prefer: "type-imports",
            fixStyle: "inline-type-imports",
        }],

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/require-await": "off",

        "@typescript-eslint/no-misused-promises": ["error", {
            checksVoidReturn: {
                attributes: false,
            },
        }],
    },
}];