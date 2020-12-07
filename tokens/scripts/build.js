const StyleDictionary = require("style-dictionary")

// ==== Include custom transforms ====
require("../custom/transforms")(StyleDictionary)

// ==== Include custom transform groups ====
require("../custom/transformGroups")(StyleDictionary)

// ==== Include custom formats ====
require("../custom/formats/formats")(StyleDictionary)

// ==== Include custom filters ====
require("../custom/filters")(StyleDictionary)

require("./site")(StyleDictionary)

const myPrefix = "ds"
// const myScssPrefix = "#{$custom-property-prefix}"

console.log("Build started...")

console.log("\n==============================================")

StyleDictionary.extend({
  source: ["tokens/generic/**/*.json", "tokens/palette/*.json"],
  platforms: {
    "web/palette-css": {
      transformGroup: "tokens-scss",
      buildPath: "tokens/generated/colors/",
      prefix: myPrefix,
      files: [
        {
          destination: "colors.css",
          format: "css/variables",
          filter: "isColor"
        }
      ]
    },
    "web/tokens-css": {
      transformGroup: "tokens-scss",
      buildPath: "tokens/generated/tokens/",
      prefix: myPrefix,
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          filter: "isToken"
        }
      ]
    },
    "web/allTokens-css": {
      transformGroup: "tokens-scss",
      buildPath: "tokens/generated/allTokens/",
      prefix: myPrefix,
      files: [
        {
          destination: `all-tokens.css`,
          format: "css/variables",
          filter: "isNotType"
        }
      ]
    },
    "web/palette-scss": {
      transformGroup: "tokens-scss",
      buildPath: "tokens/generated/colors/",
      prefix: myPrefix,
      files: [
        {
          destination: "_colors.map.scss",
          format: "scss/custom-map-deep",
          filter: "isColor"
        }
      ]
    },
    "web/tokens-scss": {
      transformGroup: "tokens-scss",
      buildPath: "tokens/generated/tokens/",
      prefix: myPrefix,
      files: [
        {
          destination: "_tokens.map.scss",
          format: "scss/custom-map-deep",
          filter: "isToken"
        }
      ]
    },
    "web/allTokens-scss": {
      transformGroup: "tokens-scss",
      buildPath: "tokens/generated/allTokens/",
      prefix: myPrefix,
      files: [
        {
          destination: "_all-tokens.map.scss",
          format: "scss/custom-map-deep",
          mapName: "all-tokens",
          filter: "isNotType"
        }
      ]
    },
    "web/palette-js": {
      transformGroup: "tokens-js",
      buildPath: "tokens/generated/colors/",
      prefix: myPrefix,
      files: [
        {
          destination: "colors.js",
          format: "javascript/es6",
          filter: "isColor"
        }
      ]
    },
    "web/palette-json": {
      transformGroup: "tokens-json",
      buildPath: "tokens/generated/colors/",
      prefix: myPrefix,
      files: [
        {
          destination: "colors.json",
          format: "json/flat",
          filter: "isColor"
        }
      ]
    },
    "web/tokens-js": {
      transformGroup: "tokens-js",
      buildPath: "tokens/generated/tokens/",
      prefix: myPrefix,
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
          filter: "isToken"
        }
      ]
    },
    "web/allTokens-js": {
      transformGroup: "tokens-js",
      buildPath: "tokens/generated/allTokens/",
      prefix: myPrefix,
      files: [
        {
          destination: `allTokens.js`,
          format: "javascript/es6",
          filter: "isNotType"
        }
      ]
    }
  }
}).buildAllPlatforms()

StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    docs: {
      transformGroup: "tokens-json",
      buildPath: "tokens/generated/",
      prefix: myPrefix,
      files: [
        {
          destination: "docs.json",
          format: "site"
          // filter: "isFigma"
        }
      ]
    }
  }
}).buildAllPlatforms()

StyleDictionary.extend({
  source: [
    "tokens/generic/*.json",
    "tokens/palette/*.json",
    "tokens/themes/core.json",
    "tokens/themes/interactive.json",
    "tokens/generic/typography.json"
  ],
  platforms: {
    figma: {
      transformGroup: "tokens",
      buildPath: "tokens/generated/",
      files: [
        {
          destination: "figma.json",
          format: "json/nested",
          filter: "isFigma"
        }
      ]
    }
  }
}).buildAllPlatforms()

StyleDictionary.extend({
  source: [
    "tokens/generic/font.json",
    "tokens/generic/lineHeight.json",
    "tokens/generic/typography.json"
  ],
  platforms: {
    "web/text-styles-scss": {
      transformGroup: "text-styles-scss",
      buildPath: "tokens/generated/typography/",
      prefix: myPrefix,
      files: [
        {
          destination: `_text-styles.map.scss`,
          format: "scss/text-styles",
          filter: "isType"
        }
      ]
    }
  }
}).buildAllPlatforms()

console.log("\nEnd processing")

console.log("\n==============================================")
console.log("\nBuild completed!")
