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
    "no-undef": "off",
    "no-unused-vars": "error",
    "prefer-const": "error",
    "react/jsx-key": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prefer-stateless-function": "error",
    "react/self-closing-comp": "error",
  },
  settings: {
    react: {
      pragma: "h",
    },
  },
};
