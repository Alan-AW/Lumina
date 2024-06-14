module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@iconfont": "./src/assets/iconfont/index.tsx",
        },
      },
    ],
    [
      "react-native-reanimated/plugin",
      // {
      //   relativeSourceLocation: true,
      // },
    ],
  ],
};
