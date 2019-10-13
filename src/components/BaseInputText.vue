<template>
  <div>
    <input
    type="text"
    class="input"
    :value="value"
    v-on="listeners"
    >
  </div>
  
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  computed: {
    listeners () {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => {
          console.log(this);
          console.log(event);
          console.log(this.$listeners);
          return this.$emit('input', event.target.value)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid $vue-blue;
}
</style>
