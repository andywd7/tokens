module.exports = StyleDictionary => {
  StyleDictionary.registerTransformGroup({
    name: "tokens-scss",
    transforms: [
      "attribute/cti",
      "name/cti/kebab",
      "name/colors",
      "name/typography",
      "time/seconds",
      "size/px",
      "color/hex"
    ]
  })

  StyleDictionary.registerTransformGroup({
    name: "tokens-js",
    transforms: [
      "attribute/cti",
      "name/cti/camel",
      "name/colors",
      "size/px",
      "color/hex"
    ]
  })

  StyleDictionary.registerTransformGroup({
    name: "tokens-json",
    transforms: [
      "attribute/cti",
      "name/cti/kebab",
      "name/colors",
      "size/px",
      "color/hex"
    ]
  })

  StyleDictionary.registerTransformGroup({
    name: "tokens",
    transforms: [
      "attribute/cti",
      "name/cti/kebab",
      "value/figma",
      "size/removePX",
      "color/hex"
    ]
  })

  StyleDictionary.registerTransformGroup({
    name: "text-styles-scss",
    transforms: ["attribute/cti", "name/cti/kebab"]
  })
}
