const { defineConfig } = require('@vue/cli-service')

const MonacaWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new MonacaWebpackPlugin()],
  },
  transpileDependencies: true,
})
