<template>
  <div class="flex-1">
    <!-- <label for="formSelect">Format:</label> -->
    <select id="formSelect" @change="change" class="custom-select">
      <option
        v-for="(opt, i) in options"
        :key="i"
        :value="opt"
        :selected="selectedOption(opt)"
        >{{ opt }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    value: String,
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectedOption(option) {
      if (this.value) {
        return option === this.value
      }
      return false
    },
    change(e) {
      const selectedValue = e.target.value
      const option = this.options.find(option => {
        return selectedValue === option
      })
      this.$emit("input", option)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
}
</style>
