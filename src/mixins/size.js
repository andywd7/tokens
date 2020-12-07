export default {
  props: {
    /**
     * Size state
     */
    size: {
      type: String,
      default: null,
      validator: value => [null, "xs", "sm", "md", "lg"].indexOf(value) !== -1
    }
  }
}
