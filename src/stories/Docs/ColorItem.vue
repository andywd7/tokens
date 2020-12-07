<template>
  <div
    class="nds-swatch"
    :style="{
      backgroundColor: backgroundColor,
      color: getContrast(backgroundColor)
    }"
  >
    <slot />
  </div>
</template>

<script>
import theme from "../../tokens/themes/theme.json"
const contrast = require("get-contrast")
export default {
  name: "ColorItem",
  props: {
    backgroundColor: {
      type: String,
      default: "#ff0"
    }
  },
  methods: {
    getContrast(hex) {
      return contrast.isAccessible(hex, theme.inverse_01) === true
        ? theme.inverse_01
        : theme.text_01
    }
  }
}
</script>

<style lang="scss" scoped>
.nds-swatch {
  display: flex;
  justify-content: space-between;
  min-height: 3rem;
  min-width: 3rem;
  padding: 1rem;
}
</style>
