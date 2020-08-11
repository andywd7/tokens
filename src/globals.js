import Vue from "vue"
import kebabCase from "lodash/kebabCase"
import snakeCase from "lodash/snakeCase"
import startCase from "lodash/startCase"

const mixinFormat = Vue.mixin({
  methods: {
    formatValue(v) {
      const sF = this.$root.selectedFormat
      return sF === "SCSS" ? "$" + v : snakeCase(v)
    }
  }
})

export default {
  install(Vue) {
    Vue.filter("kebabCase", kebabCase)
    Vue.filter("startCase", startCase)
    Vue.mixin(mixinFormat)
  }
}
