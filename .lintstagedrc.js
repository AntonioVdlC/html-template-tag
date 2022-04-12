module.exports = {
  "*.ts": [
    // https://github.com/okonet/lint-staged/issues/825
    () => "tsc --noEmit",
    "prettier --write",
  ],
  "*.js": ["prettier --write", "eslint --fix"],
};
