<template>
  <nav id="sidebarMenu" class="collapse bd-links">
    <ul class="nav flex-column text-capitalize">
      <nav-item v-for="(route, i) in routes" :key="i" :route="route">
        <template v-slot:sub>
          <ul v-if="subIsActive(route, route.path)" class="nav flex-column sub">
            <nav-item
              v-for="(subR, i) in test(route)"
              :key="i"
              :route="subR"
              class="pl-3"
            >
              {{ subR.name | startCase }}
            </nav-item>
          </ul>
        </template>
      </nav-item>
    </ul>
  </nav>
</template>

<script>
import { store } from "../../store/store"
import NavItem from "./NavItem"

export default {
  name: "Nav",
  components: {
    NavItem
  },
  data() {
    return {
      routes: this.$router.options.routes,
      tokens: store.state.tokens
    }
  },
  computed: {
    tokenRoutes() {
      const t = Object.keys(this.tokens)

      let result = t.map(letter => {
        return {
          name: letter,
          params: letter
        }
      })
      return result
    }
  },
  methods: {
    subIsActive(r, input) {
      if (r.children && r.children.length) {
        const paths = Array.isArray(input) ? input : [input]

        return paths.some(path => {
          return this.$route.path.indexOf(path) === 0
        })
      }
    },
    test(r) {
      if (r.name === "Tokens") {
        // console.log(r.children)
        const t = r.children.concat(this.tokenRoutes)
        t.shift()
        return t.sort((a, b) => (a.name > b.name ? 1 : -1))
      } else {
        return r.children
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bd-links {
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.bd-links {
  max-height: calc(100vh - 103px);
  overflow-y: auto;
}

.bd-links {
  display: block !important;
}
</style>
