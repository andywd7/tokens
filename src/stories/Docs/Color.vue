<template>
  <b-row>
    <!-- <b-col v-for="(group, index) in colors" :key="index" sm="6" md="3" lg="2"> -->
    <b-col v-for="(group, index) in colors" :key="index">
      <h3>{{ index }}</h3>
      <ul v-if="group" class="nds-colors mb-5" :class="index">
        <li v-for="(color, k) in group" :key="k">
          <color-item :background-color="color">
            <span>
              {{ color }}
            </span>
            <span> ${{ k.replace(/_/g, "-") }} </span>
          </color-item>
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>
import colors from "../../../tokens/generated/palette/palette.js"
import colorItem from "./ColorItem"
export default {
  name: "Color",
  components: {
    colorItem
  },
  data() {
    return {
      colors: colors
    }
  }
}
</script>

<style lang="scss" scoped>
.nds-colors {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
</style>
