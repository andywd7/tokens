const StyleDictionary = require("style-dictionary")

// ==== Include custom transforms ====
require("../custom/transforms")(StyleDictionary)

// ==== Include custom transform groups ====
require("../custom/transformGroups")(StyleDictionary)

// ==== Include custom formats ====
require("../custom/formats/formats")(StyleDictionary)
require("../custom/formats/theme")(StyleDictionary)
require("../custom/formats/site")(StyleDictionary)

// ==== Include custom filters ====
require("../custom/filters")(StyleDictionary)

const myPrefix = "ds"

;["core", "interactive"].map(function(type) {
  StyleDictionary.extend({
    source: [
      `tokens/source/themes/${type}.json`,
      "tokens/source/palette/**/*.json"
    ],
    platforms: {
      web: {
        transformGroup: "tokens-json",
        buildPath: "tokens/generated/figma/",
        prefix: myPrefix,
        files: [
          {
            destination: `${type}.json`,
            format: "figma/theme-map",
            filter: "isThemeMap"
          }
        ]
      }
    }
  }).buildAllPlatforms()
})

StyleDictionary.extend({
  source: [
    "tokens/source/themes/**/*.json",
    "tokens/source/palette/**/*.json",
    "tokens/source/generic/**/*.json"
  ],
  platforms: {
    "web/theme-scss": {
      transformGroup: "tokens-scss",
      buildPath: "tokens/generated/themes/",
      prefix: myPrefix,
      files: [
        {
          destination: "theme.scss",
          format: "scss/variables",
          filter: "isTheme"
        },
        {
          destination: "theme.map.scss",
          format: "scss/theme-map",
          filter: "isThemeMap"
        }
      ]
    },
    "web/theme-css": {
      transformGroup: "tokens-scss",
      buildPath: `static/`,
      // prefix: myPrefix,
      files: [
        {
          destination: `theme.css`,
          format: "css/variables",
          filter: "isTheme"
        }
      ]
    },
    "docs/theme-json": {
      transformGroup: "tokens-json",
      buildPath: `tokens/generated/themes/`,
      // prefix: myPrefix,
      files: [
        {
          destination: `themeflat.json`,
          format: "json/flat",
          filter: "isTheme"
        },
        {
          destination: `theme.json`,
          format: "site",
          filter: "isTheme"
        }
      ]
    }
  }
}).buildAllPlatforms()

console.log("\nEnd processing")

console.log("\n==============================================")
console.log("\nBuild completed!")
