const camelCase = require("lodash/camelCase")
const kebabCase = require("lodash/kebabCase")

module.exports = StyleDictionary => {
  StyleDictionary.registerTransform({
    name: "size/removePX",
    type: "value",
    matcher: function(prop) {
      return prop.value.match(/^[\d.]+px$/)
    },
    transformer: function(prop) {
      return prop.value.replace(/px$/, "")
    }
  })

  StyleDictionary.registerTransform({
    name: "name/colors",
    type: "name",
    matcher: function(prop) {
      return prop.path[0] === "colors"
    },
    transformer: function(prop, config) {
      const prefix = config.prefix ? `${config.prefix}-` : ""
      if (
        prop.attributes.type === "black" ||
        prop.attributes.type === "white"
      ) {
        return prop.name.match(/-/)
          ? prefix + prop.attributes.type
          : camelCase(prefix + prop.attributes.type)
      } else if (prop.attributes.type === "theme") {
        return prop.name.match(/-/)
          ? `${prefix}${prop.attributes.type}-${prop.attributes.subitem}`
          : camelCase(
              `${prefix}${prop.attributes.type}${prop.attributes.subitem}`
            )
      } else {
        return prop.name.match(/-/)
          ? prefix + prop.attributes.item
          : camelCase(prefix + prop.attributes.item)
      }
    }
  })

  StyleDictionary.registerTransform({
    name: "name/typography",
    type: "name",
    matcher: function(prop) {
      return prop.path[0] === "typography"
    },
    transformer: function(prop) {
      return prop.name.match(/-/)
        ? kebabCase(`${prop.attributes.type}${prop.attributes.item}`)
        : camelCase(`${prop.attributes.type}${prop.attributes.item}`)
    }
  })

  StyleDictionary.registerTransform({
    name: "value/figma",
    type: "value",
    matcher: function(prop) {
      if (prop.figma && prop.figma !== "exclude") return true
    },
    transformer: function(prop) {
      return prop.figma
    }
  })
}
