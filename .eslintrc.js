module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true,
  },
  "parser": "babel-eslint",
  "plugins": [
    "flowtype"
  ],
  "extends": "airbnb",
  "rules": {
    "import/extensions": ["off"],
    "import/no-unresolved": ["off"],
    "import/no-extraneous-dependencies": ["off"],
    "jsx-a11y/no-static-element-interactions": ["off"],
    "linebreak-style": ["off"],
    "no-plusplus": ["off"],
    "quotes": ["error", "single"],
    "react/jsx-filename-extension": ["off"],
    "react/prefer-stateless-function": ["off"],
    "semi": ["error", "always"],
  }
};
