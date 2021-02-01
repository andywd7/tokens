const kebabCase = require("lodash/kebabCase")
const startCase = require("lodash/startCase")

// https://github.com/amzn/style-dictionary/blob/main/lib/common/formats.js
function fileHeader() {
  let to_ret = ""
  // for backward compatibility we need to have the user explicitly hide them
  // var showFileHeader = options ? options.showFileHeader : true
  // if (showFileHeader) {
  // to_ret += "\n"
  to_ret += "// Do not edit directly\n"
  to_ret += "// Generated on " + new Date().toUTCString() + "\n"
  to_ret += "\n"
  // }

  return to_ret
}

module.exports = StyleDictionary => {
  StyleDictionary.registerFormat({
    name: "scss/text-styles",
    formatter: function(dictionary, config) {
      const prefix = config.prefix ? `${config.prefix}-` : ""
      const imports = `@import "../tokens/tokens.map.scss";\n\n`
      const styleMaps = Object.keys(dictionary.properties.typography)
        .map(function(key) {
          return (
            `$${kebabCase([prefix, key])}: (\n` +
            Object.keys(dictionary.properties.typography[key])
              .map(function(key2) {
                let prop = dictionary.properties.typography[key][key2]
                return `  ${key2}: $${kebabCase([prefix, prop.value])},`
              })
              .join("\n") +
            "\n) !default;\n"
          )
        })
        .join("\n")

      const styleMapMap =
        "\n$text-styles-map: (" +
        Object.keys(dictionary.properties.typography).map(function(key) {
          return `\n  ${key}: $${kebabCase([prefix, key])}`
        }) +
        "\n) !default;\n"

      return fileHeader() + imports + styleMaps + styleMapMap
    }
  })

  StyleDictionary.registerFormat({
    name: "scss/custom-map-deep",
    formatter: function(dictionary, config) {
      const prefix = config.prefix ? `${config.prefix}-` : ""
      const vars = dictionary.allProperties
        .map(function(prop) {
          return `$${prop.name}: ${prop.value} !default;`
        })
        .join("\n")

      const map =
        `\n\n$${prefix}${this.mapName || "tokens"}: (` +
        dictionary.allProperties.map(function(prop) {
          let name = prop.name.replace(prefix, "")
          return `\n  ${name}: $${kebabCase(prop.name)}`
        }) +
        "\n) !default;\n"

      return fileHeader() + vars + map
    }
  })

  StyleDictionary.registerFormat({
    name: "json/figma",
    formatter: function(dictionary) {
      // const prefix = config.prefix ? `${config.prefix}-` : ""
      const styleMaps = Object.keys(dictionary.properties.colors).map(function(
        key
      ) {
        return Object.keys(dictionary.properties.colors[key]).map(function(
          key2
        ) {
          let prop = dictionary.properties.colors[key][key2]
          let test = prop.attributes ? prop.attributes.item : ""
          return {
            token: `$${prop.name}`,
            name: `${startCase(test)}`,
            value: `${prop.value}`
          }
        })
      })

      return JSON.stringify(styleMaps.flat(), null, 2)
    }
  })
}
