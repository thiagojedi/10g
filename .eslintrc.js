module.exports = {
  plugins: [
    "@typescript-eslint",
    "jest-dom",
    "react",
    "react-hooks",
    "testing-library",
  ],
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    // 'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier",

    "plugin:react-hooks/recommended",
    "plugin:testing-library/react",
    "plugin:testing-library/recommended",
    "preact",
  ],
  parserOptions: {
    sourceType: "module", // Allows for the use of imports
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "react/jsx-key": "error",
  },
  settings: {
    react: {
      pragma: "h",
    },
  },
};
