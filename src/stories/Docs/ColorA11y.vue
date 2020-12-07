<template>
  <table class="ids-table">
    <thead>
      <tr>
        <th>-</th>
        <th v-for="(v, k) in txtColor" :key="k">
          {{ formatValue(v.name) }}
          <br />
          {{ v.value }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(val, key) in bgColor" :key="key">
        <td>
          <div class="ids-swatch ids-swatch--empty">
            {{ formatValue(val.name) }}
            <br />
            {{ val.value }}
          </div>
        </td>
        <td v-for="(v, k) in txtColor" :key="k">
          <div
            v-if="isAccessible(v.value, val.value)"
            :class="val.attributes.item"
            :style="{ backgroundColor: val.value, color: v.value }"
            class="ids-swatch"
          >
            <div class="ids-swatch__row">
              <code :style="{ color: v.value }">
                {{ v.attributes.item }} on
                <br />
                {{ val.attributes.item }}
              </code>
            </div>
            <div class="ids-swatch__row">
              <span>{{ score(val.value, v.value) }}</span>
              <span>{{ ratio(val.value, v.value) }}</span>
            </div>
          </div>
          <div v-else>
            <div class="ids-swatch ids-swatch--empty">
              NA
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { store } from "../../components/store"
import camelCase from "lodash/camelCase"
const contrast = require("get-contrast")
export default {
  name: "ColorA11y",
  props: {
    backgroundColor: {
      type: String,
      default: "blue"
    },
    contrast: {
      type: String,
      default: "Passed"
    },
    format: {
      type: String,
      default: "SCSS"
    },
    textColor: {
      type: String,
      default: "grey"
    }
  },
  data() {
    return {
      tokens: store.tokens.colors
    }
  },
  computed: {
    txtColor() {
      return this.tokens.filter(col => col.attributes.type === this.textColor)
    },
    bgColor() {
      return this.tokens.filter(
        col => col.attributes.type === this.backgroundColor
      )
    }
  },
  methods: {
    isAccessible(bg, txt) {
      if (this.contrast === "Passed") {
        return contrast.isAccessible(bg, txt)
      } else if (this.contrast === "Failed") {
        return !contrast.isAccessible(bg, txt)
      } else if (this.contrast === "AA") {
        return contrast.score(bg, txt) === "AA"
      } else if (this.contrast === "AAA") {
        return contrast.score(bg, txt) === "AAA"
      } else {
        return true
      }
    },
    score(bg, txt) {
      if (contrast.score(bg, txt) === "AA") {
        return "AA"
      } else if (contrast.score(bg, txt) === "AAA") {
        return "AAA"
      } else {
        return "F"
      }
    },
    ratio(bg, txt) {
      return contrast.ratio(bg, txt).toFixed(2)
    },
    formatValue(v) {
      return this.format === "SCSS" ? "$" + v : camelCase(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.ids-table {
  width: 100%;
}

.ids-table thead th {
  border-bottom: 2px solid #dde1e6;
  padding: 0.5rem;
  vertical-align: bottom;
}

.ids-table th,
.ids-table td {
  // border-top: 1px solid #dde1e6;
  vertical-align: top;
}

.ids-swatch {
  min-height: 3rem;
  min-width: 3rem;
  padding: 0.5rem;
}

.ids-swatch__row {
  display: flex;
  justify-content: space-between;
}
</style>
