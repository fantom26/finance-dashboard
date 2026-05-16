/** @type {import('lint-staged').Configuration} */
export default {
  '*.{vue,ts}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss}': ['prettier --write'],
  'src/**/*.{ts,vue}': () => 'yarn typecheck',
}
