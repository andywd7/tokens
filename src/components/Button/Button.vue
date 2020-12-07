<template>
  <button
    :type="type"
    :aria-pressed="ariaPressed"
    class="ii-btn"
    :class="classList"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
import size from "../../mixins/size"

export default {
  name: "IiButton",
  mixins: [size],
  props: {
    pressed: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the button type. {button, submit, reset}
     */
    type: {
      type: String,
      default: "button",
      validator: value =>
        ["button", "submit", "reset"].indexOf(value) >= 0 || undefined
    },
    variant: {
      type: String,
      default: "standard",
      validator: value =>
        ["secondary", "primary", "danger", "standard", "ghost"].indexOf(
          value
        ) !== -1
    }
  },
  computed: {
    classList() {
      return [
        this.size ? "ii-btn--" + this.size : null,
        this.variant ? "ii-btn--" + this.variant : null,
        this.pressed ? "ii-btn--pressed" : null
      ]
    },
    ariaPressed() {
      if (this.pressed) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
