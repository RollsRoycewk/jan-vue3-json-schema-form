const { defineConfig } = require('@vue/cli-service')

const MonacaWebpackPlugin = require('monaco-editor-webpack-plugin')

const isLib = process.env.TYPE === 'lib'

module.exports = defineConfig({
  configureWebpack: {
    plugins: isLib ? [] : [new MonacaWebpackPlugin()],
  },
  transpileDependencies: true,
})
