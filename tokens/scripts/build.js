const fs = require("fs")

const directoryName = "tokens/source/palette"
const filenames = fs.readdirSync(directoryName)
let paletteArray = []

filenames.forEach(file => {
  paletteArray.push(file.replace(".json", ""))
})

const StyleDictionary = require("style-dictionary")

// ==== Include custom transforms ====
require("../custom/transforms")(StyleDictionary)

// ==== Include custom transform groups ====
require("../custom/transformGroups")(StyleDictionary)

// ==== Include custom formats ====
require("../custom/formats/formats")(StyleDictionary)
require("../custom/formats/site")(StyleDictionary)

// ==== Include custom filters ====
require("../custom/filters")(StyleDictionary)

const myPrefix = "ds"

console.log(paletteArray)
paletteArray.map(function(color) {
  StyleDictionary.extend({
    source: [`tokens/source/palette/${color}.json`],
    platforms: {
      web: {
        transformGroup: "tokens-json",
        buildPath: "tokens/generated/figma/palette/",
        prefix: myPrefix,
        files: [
          {
            destination: `${color}.json`,
            format: "json/figma",
            filter: "isColor"
          }
        ]
      }
    }
  }).buildAllPlatforms()
})

StyleDictionary.extend({
  source: ["tokens/source/**/*.json"],
  platforms: {
    docs: {
      transformGroup: "tokens-json",
      buildPath: "tokens/generated/",
      prefix: myPrefix,
      files: [
        {
          destination: "docs.json",
          format: "site"
        }
      ]
    }
  }
}).buildAllPlatforms()

StyleDictionary.extend({
  source: ["tokens/source/generic/**/*.json", "tokens/source/palette/*.json"],
  platforms: {
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
      buildPath: "tokens/generated/palette/",
      prefix: myPrefix,
      files: [
        {
          destination: "palette.js",
          format: "javascript/es6",
          filter: "isColor"
        }
      ]
    },
    "web/palette-json": {
      transformGroup: "tokens-json",
      buildPath: "tokens/generated/palette/",
      prefix: myPrefix,
      files: [
        {
          destination: "palette.json",
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
  source: [
    "tokens/source/generic/*.json",
    "tokens/source/palette/*.json",
    "tokens/source/themes/core.json",
    "tokens/source/themes/interactive.json"
  ],
  platforms: {
    "figma/plugin": {
      transformGroup: "tokens",
      buildPath: "tokens/generated/figma/",
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
    "tokens/source/generic/font.json",
    "tokens/source/generic/lineHeight.json",
    "tokens/source/generic/typography.json"
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
