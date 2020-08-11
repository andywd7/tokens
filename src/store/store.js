import Vue from "vue"
import tokens from "../tokens/docs"

const colors = [...new Set(tokens.color.map(col => col.attributes.type))]
const formats = ["SCSS", "JS"]

export const store = Vue.observable({
  state: {
    tokens,
    colors: colors,
    formats: formats,
    selectedFormat: formats[0]
  }
})
