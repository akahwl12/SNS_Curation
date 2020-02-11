module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: "http://localhost:8081/",
    changeOrigin: true,
  }
}