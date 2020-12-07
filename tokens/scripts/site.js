const groupBy = require("lodash/groupBy")

module.exports = StyleDictionary => {
  StyleDictionary.registerFormat({
    name: "site",
    formatter(dictionary) {
      //   const prefix = config.prefix ? `${config.prefix}-` : "";
      const toRet = {}
      const grouped = groupBy(dictionary.allProperties, "attributes.category")

      const keys = Object.keys(grouped)
      /* eslint-disable */
      for (const key of keys) {
        const newKey = key === "undefined" ? "misc" : key
        const catArr = grouped[key]
        toRet[newKey] = []

        for (let i = 0, len = catArr.length; i < len; i++) {
          const current = catArr[i]
          
          delete current.category
          delete current.original
          delete current.path
          toRet[newKey].push(current)
        }
      }
      /* eslint-enable */
      return JSON.stringify(toRet, null, 2)
    }
  })
}
