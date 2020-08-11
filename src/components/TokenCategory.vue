<template>
  <div>
    <div v-for="(value, key, index) in typeData" :key="index">
      <h3 :id="key">{{ title(key) | startCase }}</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k, i) in value" :key="i">
            <td>{{ formatValue(v.name) }}</td>
            <td>
              <token-item :token="v"></token-item>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { store } from "../store/store"
import TokenItem from "./TokenItem"
import groupBy from "lodash/groupBy"

export default {
  name: "TokenCategory",
  components: { TokenItem },
  props: {
    tokens: {
      type: Object,
      default: () => store.state.tokens
    }
  },
  // data() {
  //   return {
  //     tokens: store.state.tokens
  //   }
  // },
  computed: {
    param() {
      return this.$route.params.token
    },
    parameter() {
      return this.tokens[this.param]
    },
    typeData() {
      return this.param === "color"
        ? groupBy(this.parameter, "attributes.type")
        : [this.parameter]
    }
  },
  methods: {
    title(t) {
      return this.param === "color" ? t : this.param
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin-left: -15px;
  margin-right: -15px;
}
</style>
