/*
 * @Author: {baixiao}
 * @Date: 2022-09-13 12:26:25
 * @LastEditors: {baixiao}
 * @LastEditTime: 2022-09-13 22:27:44
 * @Description: 
 */
const { defineConfig } = require('@vue/cli-service');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'utils': '@/utils',
      },
    },
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
})
