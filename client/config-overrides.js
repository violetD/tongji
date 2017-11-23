const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')
const SpritePlugin = require('svg-sprite-loader/plugin')
const { theme } = require('./package.json');
module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: true }], config);

  let loaderList = config.module.rules[1].oneOf;
  loaderList.splice(loaderList.length - 1, 0, {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      { loader: 'less-loader', options: { modifyVars: theme } },
    ],
    include: /node_modules/,
  });

  loaderList.splice(loaderList.length - 1, 0, {
    test: /\.svg$/,
    use: [{
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015'],
        plugins: ['transform-object-rest-spread']
      }
    }, {
      loader: 'svg-sprite-loader', 
      options: { 
        //runtimeGenerator: require.resolve('./svg-to-icon-component-runtime-generator'),
        //runtimeOptions: {
          //iconModule: path.resolve(__dirname, 'src/components/CustomIcon.js') // Relative to current build context folder
        //}
      },
    }],
    include: path.resolve(__dirname, 'src/assets/svg'),
  });

  config.plugins.push(new SpritePlugin());

  return config;
};
