<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
      <ValidationProvider vid="field1" v-slot="{ errors }">
        <input style="border: 1px solid black;" type="text" v-model="field1" />
        <span id="error1">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider vid="field2" v-slot="{ errors }">
        <input style="border: 1px solid black;" type="text" v-model="field2" />
        <span id="error2">{{ errors[0] }}</span>
      </ValidationProvider>
    </ValidationObserver>
  </div>
</template>

<script>
// import { ValidationObserver } from 'vee-validate/dist/vee-validate.full';
export default {
  data() {
    return {
      field1: '',
      field2: '',
    };
  },
  
  methods: {
    submit() {
      // No need to worry about form state
      // as this is only runs when the form is valid
      // 🐿 ship it
      this.$refs.observer.validate();
      this.$refs.observer.setErrors({
        field1: ["wrong"],
        field2: ["whoops"]
      });
    }
  }
};
// Somewhere in a method, set the errors for each field.
</script>