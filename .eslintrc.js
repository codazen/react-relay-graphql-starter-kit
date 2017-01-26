module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "flowtype"
  ],
  "extends": "airbnb",
  "rules": {
    "jsx-quotes": ["off"],
    "linebreak-style": ["off"],
    "quotes": ["error", "single"],
    "react/jsx-filename-extension": ["off"],
    "react/prefer-stateless-function": ["off"],
    "semi": ["error", "always"],
  }
};
