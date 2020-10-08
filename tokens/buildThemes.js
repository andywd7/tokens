const camelCase = require("lodash/camelCase")
const kebabCase = require("lodash/kebabCase")

const StyleDictionary = require("style-dictionary")
require("./site")(StyleDictionary)

// REGISTER CUSTOM FORMATS + TEMPLATES + TRANSFORMS + TRANSFORM GROUPS

// StyleDictionary.registerTransform({
//   name: "name/color",
//   type: "name",
//   matcher: function(prop) {
//     return prop.path[0] === "color"
//   },
//   transformer: function(prop) {
//     return prop.name.replace(
//       new RegExp(
//         prop.attributes.category + "(_|-)" + prop.attributes.type + "(_|-)",
//         "gi"
//       ),
//       ""
//     )
//   }
// })

StyleDictionary.registerTransform({
  name: "name/scssTheme",
  type: "name",
  matcher: function(prop) {
    return prop.path[0] === "theme"
  },
  transformer: function(prop) {
    return kebabCase(
      prop.name.replace(new RegExp(prop.attributes.type + "(_|-)", "gi"), "")
    )
  }
})

StyleDictionary.registerTransform({
  name: "name/jsTheme",
  type: "name",
  matcher: function(prop) {
    return prop.path[0] === "theme"
  },
  transformer: function(prop) {
    return camelCase(
      prop.name.replace(new RegExp(prop.attributes.type + "(_|-)", "gi"), "")
    )
  }
})

// StyleDictionary.registerFilter({
//   name: "isColor",
//   matcher: function(prop) {
//     return prop.attributes.category === "color" && !prop.theme
//   }
// })

// StyleDictionary.registerFilter({
//   name: "isToken",
//   matcher: function(prop) {
//     return prop.attributes.category !== "color" && !prop.theme
//   }
// })

StyleDictionary.registerFilter({
  name: "isTheme",
  matcher: function(prop) {
    return prop.path[0] === "theme"
  }
})

// StyleDictionary.registerFilter({
//   name: "isNotTheme",
//   matcher: function(prop) {
//     return prop.path[0] !== "theme"
//   }
// })

StyleDictionary.registerTransformGroup({
  name: "tokens-scss",
  // to see the pre-defined "scss" transformation use: console.log(StyleDictionaryPackage.transformGroup['scss']);
  transforms: [
    // "attribute/cti",
    // "name/cti/kebab",
    // "name/color",
    "name/scssTheme",
    "time/seconds",
    "size/px",
    "color/css"
  ]
})

StyleDictionary.registerTransformGroup({
  name: "tokens-js",
  transforms: [
    // "attribute/cti",
    // "name/cti/constant",
    // "name/color",
    "name/jsTheme",
    "size/px",
    "color/hex"
  ]
})

StyleDictionary.registerTransformGroup({
  name: "tokens-json",
  transforms: [
    "attribute/cti",
    // "name/cti/kebab",
    // "name/color",
    "name/jsTheme",
    "size/px",
    "color/hex"
  ]
})

// console.log("Build started...");

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS
// console.log("\n==============================================");

function getStyleDictionaryConfig(brand, platform) {
  return {
    // StyleDictionary.extend({
    source: [
      `tokens/themes/${brand}/*.json`,
      "tokens/palette/**/*.json",
      "tokens/generic/**/*.json"
    ],
    platforms: {
      "web/theme-scss": {
        transformGroup: "tokens-scss",
        buildPath: `public/tokens/themes/${platform}_${brand}/`,
        files: [
          {
            destination: `${brand}.css`,
            format: "css/variables",
            filter: "isTheme"
          },
          {
            destination: `${brand}.scss`,
            format: "scss/variables",
            filter: "isTheme"
          },
          {
            destination: `${brand}.map.scss`,
            format: "scss/map-flat",
            filter: "isTheme"
          }
        ]
      },
      "web/theme-js": {
        transformGroup: "tokens-js",
        buildPath: `public/tokens/themes/${platform}_${brand}/`,
        files: [
          {
            destination: `${brand}.js`,
            format: "javascript/es6",
            filter: "isTheme"
          }
        ]
      },
      "docs/theme-json": {
        transformGroup: "tokens-json",
        buildPath: `src/tokens/themes/`,
        files: [
          {
            destination: `${brand}.json`,
            format: "site",
            filter: "isTheme"
          }
        ]
      }
    }
  }
}
// })
// .buildAllPlatforms()

;["web"].map(function(platform) {
  ;["dark", "light"].map(function(brand) {
    console.log("\n==============================================")
    console.log(`\nProcessing: [[${brand}]`)

    const SD = StyleDictionary.extend(getStyleDictionaryConfig(brand, platform))

    if (platform === "web") {
      SD.buildPlatform("web/theme-scss")
      SD.buildPlatform("web/theme-js")
    }
    SD.buildPlatform("docs/theme-json")

    console.log("\nEnd processing")
  })
})

console.log("\nEnd processing")

console.log("\n==============================================")
console.log("\nBuild completed!")
