/**
 * @type {Partial<import("typedoc").TypeDocOptions>}
 */
module.exports = {
  name: 'React Native Animated Modal',
  out: 'docs',
  tsconfig: 'tsconfig.json',
  githubPages: true,
  favicon: 'preview.ico',

  entryPoints: ['src/index.ts'],
  navigationLinks: {
    Github: 'https://github.com/hyoper/react-native-animated-modal',
    Npm: 'https://www.npmjs.com/package/@hyoper/rn-animated-modal',
  },

  highlightLanguages: ['bash', 'typescript', 'json', 'json5'],
  customCss: ['typedoc-custom.css'],
};
