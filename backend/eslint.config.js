import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    // General settings for all JavaScript files
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
    rules: {
      // Add any other general rules here
    },
  },
  pluginJs.configs.recommended,
  {
    // Specific settings for Jest test files
    files: ["**/tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest,  // Include Jest globals like describe, it, expect, etc.
      },
    },
    rules: {
      // Add any Jest-specific rules here if needed
      "no-undef": "off", // Turn off no-undef for Jest globals
    },
  },
];
