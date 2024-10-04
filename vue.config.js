const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve("util/"),
        os: require.resolve("os-browserify/browser"),
      },
    },
  },
});
