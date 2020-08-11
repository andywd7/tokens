<template>
  <li className="nav-item">
    <router-link
      class="nav-link px-4"
      exact-active-class="active"
      :to="toValue"
    >
      <slot>
        {{ route.name | startCase }}
      </slot>
    </router-link>
    <slot name="sub" />
  </li>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    route: {
      type: [Object, String],
      default: "/"
    }
  },
  computed: {
    toValue() {
      if (this.route.params) {
        return {
          name: "token",
          params: {
            token: this.route.params
          }
        }
      } else {
        return { name: this.route.name }
      }
    }
  }
}
</script>
