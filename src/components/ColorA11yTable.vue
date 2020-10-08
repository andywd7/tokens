<template>
  <table class="table">
    <thead>
      <tr>
        <th>-</th>
        <th v-for="(v, k) in textColor" :key="k">
          {{ formatValue(v.name) }}
          <br />
          {{ v.value }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(val, key) in backgroudColor" :key="key">
        <td>
          {{ formatValue(val.name) }}
          <br />
          {{ val.value }}
        </td>
        <td v-for="(v, key) in textColor" :key="key">
          <div
            v-if="isAccessible(v.value, val.value)"
            :class="val.attributes.item"
            :style="{ backgroundColor: val.value, color: v.value }"
            class="nds-swatch"
          >
            <div class="nds-swatch__row">
              <code :style="{ color: v.value }">
                {{ v.attributes.item }} on
                <br />
                {{ val.attributes.item }}
              </code>
            </div>
            <div class="nds-swatch__row">
              <span>{{ score(val.value, v.value) }}</span>
              <span>{{ ratio(val.value, v.value) }}</span>
            </div>
          </div>
          <div v-else>NA</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const contrast = require("get-contrast")

export default {
  name: "ColorA11yTable",
  props: {
    colors: {
      type: Array,
      required: true
    },
    txtColor: {
      type: String,
      default: "grey",
      required: true
    },
    bgColor: {
      type: String,
      default: "blue",
      required: true
    },
    view: {
      type: String
    }
  },
  methods: {
    isAccessible(bg, txt) {
      // const isA = {}
      // switch (this.view) {
      //   case "Passed":
      //     contrast.isAccessible(bg, txt)
      //     break
      //   case "Failed":
      //     !contrast.isAccessible(bg, txt)
      //     break
      //   case "AA":
      //     contrast.score(bg, txt) === "AA"
      //     break
      //   case "AAA":
      //     contrast.score(bg, txt) === "AAA"
      //     break
      if (this.view === "Passed") {
        return contrast.isAccessible(bg, txt)
      } else if (this.view === "Failed") {
        return !contrast.isAccessible(bg, txt)
      } else if (this.view === "AA") {
        return contrast.score(bg, txt) === "AA"
      } else if (this.view === "AAA") {
        return contrast.score(bg, txt) === "AAA"
      } else {
        return true
      }
      // }
      // return isA
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
    }
  },
  computed: {
    textColor() {
      return this.colors.filter(col => col.attributes.type === this.txtColor)
    },
    backgroudColor() {
      return this.colors.filter(col => col.attributes.type === this.bgColor)
    }
  }
}
</script>

<style lang="scss" scoped>
/* .nds-grey-80 {
  border: 1px solid $grey-50;
} */

.nds-swatch {
  min-height: 3rem;
  min-width: 3rem;
  padding: 0.5rem;
}

.nds-swatch__row {
  display: flex;
  justify-content: space-between;
}
</style>
