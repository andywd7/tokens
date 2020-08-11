<template>
  <div id="app">
    <div class="row no-gutters flex-xl-nowrap">
      <div class="col-md-3 col-xl-2">
        <Sidebar />
      </div>
      <main role="main" class="col-md-9 col-xl-10 bd-content">
        <title-block />
        <div class="px-5">
          <div class="row">
            <div class="col-md-9">
              <router-view />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar"
import TitleBlock from "./components/TitleBlock"

export default {
  components: {
    Sidebar,
    TitleBlock
  }
}
</script>

<style lang="scss" scoped>
.bd-content {
  order: 1;
}
</style>
