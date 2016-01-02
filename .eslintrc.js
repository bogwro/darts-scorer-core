module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  plugins:  [
    'babel'
  ],
  'rules': {
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 1,
    "babel/object-curly-spacing": 1,
    "babel/object-shorthand": 1,
    "babel/arrow-parens": 1,
    "babel/no-await-in-loop": 1,
    "valid-jsdoc": [2, {
      "requireReturn": false
    }]
  }
}
;
