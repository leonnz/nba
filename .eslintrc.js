module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  plugins: ['vue'],
  rules: {
    'no-console': 'off'
  },
  env: {
    browser: true,
    amd: true,
    node: true
  }
};
