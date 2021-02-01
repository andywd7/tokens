module.exports = StyleDictionary => {
  StyleDictionary.registerFilter({
    name: "isToken",
    matcher: function(prop) {
      return (
        prop.attributes.category !== "colors" &&
        prop.attributes.category !== "typography"
      )
    }
  })

  StyleDictionary.registerFilter({
    name: "isColor",
    matcher: function(prop) {
      return prop.attributes.category === "colors" && prop.path[1] !== "theme"
    }
  })

  StyleDictionary.registerFilter({
    name: "isType",
    matcher: function(prop) {
      return (
        prop.attributes.category === "typography" &&
        prop.attributes.item !== "docs"
      )
    }
  })

  StyleDictionary.registerFilter({
    name: "isNotType",
    matcher: function(prop) {
      return prop.attributes.category !== "typography"
    }
  })

  StyleDictionary.registerFilter({
    name: "isThemeMap",
    matcher: function(prop) {
      return (
        prop.path[0] === "theme" ||
        prop.path[1] === "theme" ||
        (prop.path[0] === "typography" && prop.attributes.item !== "docs") ||
        prop.theme
      )
    }
  })

  StyleDictionary.registerFilter({
    name: "isTheme",
    matcher: function(prop) {
      return prop.path[0] === "theme" || prop.path[1] === "theme"
    }
  })

  StyleDictionary.registerFilter({
    name: "isNotTheme",
    matcher: function(prop) {
      return (
        prop.attributes.category !== "theme" ||
        prop.attributes.type !== "theme" ||
        prop.attributes.category !== "typography"
        // !prop.theme
      )
    }
  })

  StyleDictionary.registerFilter({
    name: "isFigma",
    matcher: function(prop) {
      if (prop.figma) {
        if (prop.figma !== "exclude") {
          return prop.figma
        }
      } else {
        if (prop.attributes.item !== "docs") return prop.value
      }
    }
  })
}
