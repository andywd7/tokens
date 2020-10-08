const _ = require("lodash")

module.exports = StyleDictionary => {
  /* js module */
  StyleDictionary.registerFormat({
    name: "site",
    formatter(dictionary) {
      //   const prefix = config.prefix ? `${config.prefix}-` : "";
      const toRet = {}
      const grouped = _.groupBy(dictionary.allProperties, "attributes.category")
      // console.log(grouped)
      const keys = Object.keys(grouped)
      /* eslint-disable */
      for (const key of keys) {
        const newKey = key === "undefined" ? "misc" : key
        const catArr = grouped[key]
        toRet[newKey] = []

        for (let i = 0, len = catArr.length; i < len; i++) {
          const current = catArr[i]
          // console.log(catArr[0]);

          // if (_.has(current, "mixin")) {
          //   current.mixin = `${current.mixin}`;
          // }

          delete current.original
          delete current.path
          toRet[newKey].push(current)
        }
      }
      /* eslint-enable */
      // console.log(toRet)
      return JSON.stringify(toRet, null, 2)
    }
  })
}
