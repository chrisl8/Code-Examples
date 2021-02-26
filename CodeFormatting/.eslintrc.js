// Also see .prettierrc
// My goal here is to make this as close to AIRBNB as possible,
// while still using Prettier, which takes care of all the questions and
// keeping things VERY consistent.
// To test things, comment the long extends line, uncomment the one that just has 'airbnb'
// and comment out the prettier rule,
// This will leave you with just AirBNB, and see if it agrees mostly.

// One compromise I made was to ALWAYS use parens on arrow function arguments in .prettierrc,
// because it makes both AirBNB and Prettier happy and is automatic.
// Less thinking is better than perfect and/or my preferences.

module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier'],
  extends: ['airbnb', 'prettier'],
  env: {
    es6: true, // Probably not needed, because of babel-eslint
    node: true, // Probably not needed, because of babel-eslint
    browser: true, // Allows usage of window global. Comment out for Node.js code bases
  },
  rules: {
    'prettier/prettier': 'error',
    // Even FB says to name JSX files .js these days
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // These are not code style or real errors, just "best practices" that really mean
    // me making wonky code to fit requirements I don't need to fulfill.
    // Someday I'll remove these as I get better. ;)
    'react/prop-types': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-for': 0,
    'class-methods-use-this': 0,
    // 'no-console': 'off', // I usually uncomment this for Node.js apps
    'no-prototype-builtins': 'off', // This seems like overkill
    'prefer-destructuring': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'consistent-return': 'off',
    // Classes are fine, no actual performance benefit has been stated to exist yet
    // for functional, and the future direction of react is functional ONLY,
    // so they will all have to be converted someday anyway
    'react/prefer-stateless-function': 'off',
    // I don't really know what the next one even means
    'react/destructuring-assignment': [
      1,
      'never',
      { ignoreClassFields: false },
    ],
  },
};
