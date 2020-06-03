module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-import"),
    require("tailwindcss")("./tailwind.config.js")
  ]
}
