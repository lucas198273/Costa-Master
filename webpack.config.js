module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path]__[name]__[local]___[hash:base64:5]",
              },
              importLoaders: 1, // Aplica o postcss-loader antes do css-loader
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
};
