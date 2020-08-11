<template>
  <div class="jumbotron px-5">
    <h1 class="display-4">{{ title }}</h1>
    <slot />
    <slot name="filters" />
  </div>
</template>

<script>
export default {
  name: "TitleBlock",
  props: {
    title: {
      type: String,
      default: "Tokens"
    }
  }
}
</script>

<style lang="scss" scoped>
.jumbotron {
  background-color: #ccc;
  border-radius: 0;
}
</style>
