module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@config": "./config",
            "@components": "./components",
            "@screens": "./screens",
            "@lib": "./lib",
            "@utils": "./utils",
            "@hooks": "./hooks",
            "@contexts": "./contexts",
            "@firebase": "./firebase",
          },
          // extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
