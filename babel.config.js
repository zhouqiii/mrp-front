module.exports = {
  plugins: [
    [
      'transform-imports',
      {
        require: {
          transform: "import($$$path$$$, '$$$file$$$')",
        },
      },
    ],
  ],
}
// "plugins": [ ["transform-remove-console", { "exclude": [ "error", "warn"] }] ]
