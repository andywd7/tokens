// import Vue from "vue"
import tokens from "../../tokens/generated/docs"
import theme from "../tokens/themes/theme.json"

const colors = [...new Set(tokens.colors.map(col => col.attributes.type))]

export const store = {
  colors: colors,
  contrast: ["All", "Passed", "Failed", "AA", "AAA"],
  formats: ["SCSS", "JS"],
  theme,
  tokens
}

export const sizeOptions = {
  Default: null,
  Small: "sm"
}

export const typeOptions = {
  Default: null,
  Button: "button",
  Submit: "submit",
  Reset: "reset"
}

export const variantOptions = {
  Default: null,
  Primary: "primary",
  Secondary: "secondary",
  Standard: "standard",
  Danger: "danger",
  Ghost: "ghost"
}
