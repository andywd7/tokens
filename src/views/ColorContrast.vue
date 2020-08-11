<template>
  <div>
    <div>
      Bg:
      <form-select v-model="selectedBk" :options="colors" />
    </div>
    <div>
      Txt:
      <form-select v-model="selectedText" :options="colors" />
    </div>
    <div>
      View:
      <form-select v-model="selectedView" :options="views" />
    </div>
    <ColorA11yTable
      :colors="tokens"
      :bgColor="selectedBk"
      :txtColor="selectedText"
      :view="selectedView"
    />
  </div>
</template>

<script>
import { store } from "../store/store"
import ColorA11yTable from "../components/ColorA11yTable"
import FormSelect from "../components/FormSelect"

export default {
  name: "ColorContrast",
  components: {
    FormSelect,
    ColorA11yTable
  },
  data() {
    return {
      tokens: store.state.tokens.color,
      colors: store.state.colors,
      selectedBk: store.state.colors[0],
      selectedText: store.state.colors[1],
      views: ["All", "Passed", "Failed", "AA", "AAA"],
      selectedView: "Passed"
    }
  }
}
</script>
