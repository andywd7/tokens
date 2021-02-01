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
    name: "scss/theme-map",
    formatter: function(dictionary, config) {
      const prefix = config.prefix ? `${config.prefix}-` : ""
      const themeDefaultMap = "$" + prefix + "theme-default"
      const themeMap = "$" + prefix + "theme"
      const remove = dictionary.allProperties.filter(
        item => item.path[0] !== "typography"
      )

      const values = remove.map(function(prop) {
        let name = prop.name.replace(prefix, "")
        return prop.path[1].includes("font-family")
          ? `\n  ${name}: (${prop.value})`
          : `\n  ${name}: ${prop.value}`
      })

      const type = Object.keys(dictionary.properties.typography).map(function(
        key
      ) {
        return (
          `\n  ${kebabCase(key)}: (\n` +
          Object.keys(dictionary.properties.typography[key])
            .map(function(key2) {
              let prop = dictionary.properties.typography[key][key2]
              return prop.path[2].includes("font-family")
                ? `    ${key2}: (${prop.alias}),`
                : `    ${key2}: ${prop.alias},`
            })
            .join("\n") +
          "\n  )"
        )
      })

      const styleMap =
        themeDefaultMap + ": (" + values.concat(type) + "\n) !default;\n\n"

      const values2 = remove.map(function(prop) {
        let name = prop.name.replace(prefix, "")
        return (
          `\n  ${name}: if (\n    global-variable-exists("${prop.name}"),` +
          `\n    $${kebabCase(prop.name)},` +
          `\n    map-get(${themeDefaultMap}, "${kebabCase(prop.name)}")` +
          `\n  )`
        )
      })

      const type2 = Object.keys(dictionary.properties.typography).map(function(
        key
      ) {
        return (
          `\n  ${key}: if (` +
          `\n    global-variable-exists("${key}"),` +
          `\n    $${kebabCase([prefix, key])},` +
          `\n    map-get(${themeDefaultMap}, "${kebabCase(key)}")` +
          `\n  )`
        )
      })

      const styleMapMap =
        themeMap + ": (" + values2.concat(type2) + "\n) !default;\n"

      return fileHeader() + styleMap + styleMapMap
    }
  })

  StyleDictionary.registerFormat({
    name: "figma/theme-map",
    formatter: function(dictionary) {
      const remove = dictionary.allProperties.filter(
        item => item.path[0] !== "typography"
      )

      const values2 = remove.map(function(prop) {
        const description = prop.description.replace(/; /g, "; \\n")
        return {
          token: `${prop.attributes.subitem}`,
          description: `${description}`,
          name: `${startCase(prop.valueName)}`,
          value: `${prop.value}`
        }
      })

      return JSON.stringify(values2, null, 2)
    }
  })
}
