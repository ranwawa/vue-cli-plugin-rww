const tasks = arr => arr.join(' && ');
const PRE_COMMIT = [
  'npm run pretty-quick',
  'npm run eslint',
];
module.exports = {
  'hooks': {
    'pre-commit': tasks(PRE_COMMIT),
    'pre-push': tasks([ ]),
  },
};
