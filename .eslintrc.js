module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "flowtype"
  ],
  "extends": "airbnb",
  "rules": {
    "jsx-a11y/no-static-element-interactions": ["off"],
    "jsx-quotes": ["off"],
    "linebreak-style": ["off"],
    "no-plusplus": ["off"],
    "quotes": ["error", "single"],
    "react/jsx-filename-extension": ["off"],
    "react/prefer-stateless-function": ["off"],
    "semi": ["error", "always"],
  }
};
