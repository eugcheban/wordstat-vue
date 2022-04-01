module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/compat')
    devtool: 'sourcemap'
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
    }
}