const StyleDictionary = require("style-dictionary")
require("./site")(StyleDictionary)

// REGISTER CUSTOM FORMATS + TEMPLATES + TRANSFORMS + TRANSFORM GROUPS

StyleDictionary.registerTransform({
  name: "name/removeColor",
  type: "name",
  matcher: function(prop) {
    return prop.path[0] === "color"
  },
  transformer: function(prop) {
    return prop.name.replace(
      new RegExp(
        prop.attributes.category + "(_|-)" + prop.attributes.type + "(_|-)",
        "gi"
      ),
      ""
    )
  }
})

StyleDictionary.registerFilter({
  name: "isColor",
  matcher: function(prop) {
    return prop.attributes.category === "color" && !prop.theme
  }
})

StyleDictionary.registerFilter({
  name: "isToken",
  matcher: function(prop) {
    return prop.attributes.category !== "color" && !prop.theme
  }
})

StyleDictionary.registerFilter({
  name: "isTheme",
  matcher: function(prop) {
    return prop.theme
  }
})

StyleDictionary.registerFilter({
  name: "isNotTheme",
  matcher: function(prop) {
    return !prop.theme
  }
})

StyleDictionary.registerTransformGroup({
  name: "tokens-scss",
  // to see the pre-defined "scss" transformation use: console.log(StyleDictionaryPackage.transformGroup['scss']);
  transforms: [
    "attribute/cti",
    "name/cti/kebab",
    "name/removeColor",
    "time/seconds",
    "size/px",
    "color/css"
  ]
})

StyleDictionary.registerTransformGroup({
  name: "tokens-js",
  transforms: [
    "attribute/cti",
    "name/cti/constant",
    "name/removeColor",
    "size/px",
    "color/hex"
  ]
})

StyleDictionary.registerTransformGroup({
  name: "tokens-json",
  transforms: [
    "attribute/cti",
    "name/cti/kebab",
    "name/removeColor",
    "size/px",
    "color/hex"
  ]
})

// console.log("Build started...");

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS
// console.log("\n==============================================");

StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    "web/palette-scss": {
      transformGroup: "tokens-scss",
      buildPath: `public/tokens/web/`,
      files: [
        {
          destination: `palette.scss`,
          format: "scss/variables",
          filter: "isColor"
        }
      ]
    },
    "web/js": {
      transformGroup: "tokens-js",
      buildPath: `public/tokens/web/`,
      files: [
        {
          destination: `palette.js`,
          format: "javascript/es6",
          filter: "isColor"
        }
      ]
    },
    "web/tokens-scss": {
      transformGroup: "tokens-scss",
      buildPath: `public/tokens/web/`,
      files: [
        {
          destination: `tokens.scss`,
          format: "scss/variables",
          filter: "isToken"
        }
      ]
    },
    "web/tokens-js": {
      transformGroup: "tokens-js",
      buildPath: `public/tokens/web/`,
      files: [
        {
          destination: `tokens.js`,
          format: "javascript/es6",
          filter: "isToken"
        }
      ]
    },
    "web/tokensAndPalette-scss": {
      transformGroup: "tokens-scss",
      buildPath: `public/tokens/web/`,
      files: [
        {
          destination: `tokensAndPalette.scss`,
          format: "scss/variables",
          filter: "isNotTheme"
        }
      ]
    },
    "web/tokensAndPalette-js": {
      transformGroup: "tokens-js",
      buildPath: `public/tokens/web/`,
      files: [
        {
          destination: `tokensAndPalette.js`,
          format: "javascript/es6",
          filter: "isNotTheme"
        }
      ]
    },
    "web/categorizedTokensAndPalette-json": {
      transformGroup: "tokens-json",
      buildPath: `src/tokens/`,
      files: [
        {
          destination: `docs.json`,
          format: "site",
          filter: "isNotTheme"
        }
      ]
    },
    "theme/dark-scss": {
      transformGroup: "tokens-scss",
      buildPath: `public/tokens/theme/dark/`,
      files: [
        {
          destination: `dark.scss`,
          format: "scss/variables",
          filter: "isTheme"
        }
      ]
    }
  }
}).buildAllPlatforms()

console.log("\nEnd processing")

console.log("\n==============================================")
console.log("\nBuild completed!")
