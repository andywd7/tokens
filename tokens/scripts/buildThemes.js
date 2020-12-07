const StyleDictionary = require("style-dictionary")

// ==== Include custom transforms ====
require("../custom/transforms")(StyleDictionary)

// ==== Include custom transform groups ====
require("../custom/transformGroups")(StyleDictionary)

// ==== Include custom formats ====
require("../custom/formats/formats")(StyleDictionary)
require("../custom/formats/theme")(StyleDictionary)

// ==== Include custom filters ====
require("../custom/filters")(StyleDictionary)

require("./site")(StyleDictionary)

const myPrefix = "ds"

// StyleDictionary.registerTransform({
//   name: "name/jsTheme",
//   type: "name",
//   matcher: function(prop) {
//     return prop.path[0] === "theme"
//   },
//   transformer: function(prop) {
//     return camelCase(
//       prop.name.replace(new RegExp(prop.attributes.type + "(_|-)", "gi"), "")
//     )
//   }
// })

console.log("Build started...")

console.log("\n==============================================")

StyleDictionary.extend({
  source: [
    "tokens/themes/**/*.json",
    "tokens/palette/**/*.json",
    "tokens/generic/**/*.json"
  ],
  platforms: {
    "web/theme-scss": {
      transformGroup: "tokens-scss",
      buildPath: "tokens/generated/themes/",
      prefix: myPrefix,
      files: [
        // {
        //   destination: "theme.css",
        //   format: "css/variables",
        //   filter: "isTheme"
        // },
        // {
        //   destination: "theme.scss",
        //   format: "scss/variables",
        //   filter: "isTheme"
        // },
        {
          destination: "theme.map.scss",
          format: "scss/theme-map",
          filter: "isTheme"
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
    // "web/theme-js": {
    //   transformGroup: "tokens-js",
    //   // buildPath: `public/tokens/themes/${platform}_${brand}/`,
    //   buildPath: `tokens/generated/themes/`,
    //   files: [
    //     {
    //       // destination: `${brand}.js`,
    //       destination: `theme.js`,
    //       format: "javascript/es6",
    //       filter: "isTheme"
    //     }
    //   ]
    // },
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
