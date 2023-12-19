module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        const ruleCss = webpackConfig.module.rules.find(rule => String(rule.test) === String(/\.css$/));
        const ruleCssModule = webpackConfig.module.rules.find(rule => String(rule.test) === String(/\.module\.css$/));
  
        if (ruleCss && ruleCss.oneOf) {
          ruleCss.oneOf.forEach(oneOf => {
            if (oneOf.sideEffects === false && oneOf.use) {
              // Find the css-loader and modify its options
              const cssLoader = oneOf.use.find(use => use.loader && use.loader.includes('css-loader'));
              if (cssLoader) {
                cssLoader.options.modules = {
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                };
              }
            }
          });
        }
  
        if (ruleCssModule && ruleCssModule.oneOf) {
          ruleCssModule.oneOf.forEach(oneOf => {
            if (oneOf.sideEffects === false && oneOf.use) {
              // Find the css-loader and modify its options
              const cssLoader = oneOf.use.find(use => use.loader && use.loader.includes('css-loader'));
              if (cssLoader) {
                cssLoader.options.modules = {
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                };
              }
            }
          });
        }
  
        return webpackConfig;
      }
    }
  };
  