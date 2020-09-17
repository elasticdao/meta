import run from '../utils/run';

export default () => run([
  'cd tmp/repo',
  'mkdir -p .github',
  'yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import solhint',
  'rm -v .eslintrc .eslintrc.js .solhint.json',
  'cp -v ../../config/solhint.json .solhint.json',
  'cp -v ../../config/eslint/es6.eslint.js .eslintrc.js',
  'sed -i "s/\\"scripts\\": {/\\"scripts\\": {\\n'
    + '    \\"lint\\": \\"yarn lint:es6 \&\& yarn lint:solidity\\",\\n'
    + '    \\"lint:es6\\": \\"npx eslint **\\/*.js\\",\\n'
    + '    \\"lint:solidity\\": \\"npx solhint **\\/*.sol\\",\\n'
    + '    \\"prerelease\\": \\"yarn lint\\",\\n'
    + '/" package.json',
]);
