<template>
  <div class="bd-sidebar">
    <form class="bd-search d-flex align-items-center">
      <form-select v-model="$root.selectedFormat" :options="formats" />
      <button
        class="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="bd-docs-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="30"
          height="30"
          focusable="false"
        >
          <title>Menu</title>
          <path
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-miterlimit="10"
            d="M4 7h22M4 15h22M4 23h22"
          ></path>
        </svg>
      </button>
    </form>
    <Nav />
  </div>
</template>

<script>
import { store } from "../store/store"
import FormSelect from "./FormSelect"
import Nav from "./Nav/Nav"

export default {
  name: "Sidebar",
  components: {
    FormSelect,
    Nav
  },
  data() {
    return {
      formats: store.state.formats
    }
  }
}
</script>

<style lang="scss" scoped>
.bd-sidebar {
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  order: 0;
}

/* @include media-breakpoint-up(md) { */
.bd-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  height: 100vh;
  position: sticky;
  top: 0;
}
/* } */

/* @include media-breakpoint-up(lg) { */
.bd-sidebar {
  flex: 0 1 320px;
}
/* } */

.bd-search {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem 1.5rem;
  position: relative;
}
</style>
