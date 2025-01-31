// next.config.js
module.exports = {
    webpack: (config) => {
      // Customize the webpack config here
      config.module.rules.push({
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['next/babel', { 'preset-env': { targets: 'defaults' } }]
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      });
  
      return config;
    }
  };