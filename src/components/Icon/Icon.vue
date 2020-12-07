<template>
  <span
    class="ii-icon"
    :class="{ 'ii-icon--only': iconPosition === null }"
    v-bind="$attrs"
  >
    <span
      v-if="iconPosition !== 'right'"
      aria-hidden="true"
      :class="[iconClass, iconName, iconSpacing]"
    />
    <span :class="[hideTextClasses, textClass]">
      <slot />
    </span>
    <span
      v-if="iconPosition === 'right'"
      aria-hidden="true"
      :class="[iconClass, iconName, iconSpacing]"
    />
  </span>
</template>

<script>
export default {
  name: "IiIcon",
  status: "prototype",
  release: "1.0.0",
  props: {
    hideText: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(sm|md|lg|xl)/)
      }
    },
    icon: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      default: null
    },
    iconPosition: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(left|right)/)
      }
    },
    textClass: {
      type: String,
      default: null
    }
  },
  computed: {
    iconName() {
      return this.icon ? "fas fa-" + this.icon : ""
    },
    iconSpacing() {
      if (this.iconPosition === "left") {
        return this.hideText !== null ? "mr-" + this.hideText + "-1" : "mr-1"
      } else if (this.iconPosition === "right") {
        return this.hideText !== null ? "ml-" + this.hideText + "-1" : "ml-1"
      }
      return null
    },
    hideTextClasses() {
      if (this.hideText !== null) {
        return "sr-only sr-" + this.hideText + "-off"
      } else if (this.iconPosition === null) {
        return "sr-only"
      }
      return null
    }
  }
}
</script>
