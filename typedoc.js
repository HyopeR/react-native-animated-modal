/** @type {Partial<import("typedoc").TypeDocOptions>} */
module.exports = {
  name: "React Native Animated Modal",
  entryPoints: ["./src/index.ts"],
  out: "docs",
  tsconfig: "./tsconfig.json",
  githubPages: true,
  navigationLinks: {
    Github: "https://github.com/hyoper/react-native-animated-modal"
  },
  customCss: ['./typedoc.css']
};
