<template>
  <div>
    <test-component @addSize="addSize"></test-component>
    <p :style="{fontSize: postSize + 'rem'}">hello</p>
  </div>
</template>
<script>
import TestComponent from "./TestComponent";

export default {
  components: {
    TestComponent
  },
  data() {
    return {
      tab: 1,
      postSize: 1
    };
  },
  methods: {
    handleChange(number1) {
      console.log("helsda " + this.tab);
      console.log(number1);
    },
    handleClick(ClickEvent) {
      console.log(JSON.stringify(ClickEvent) + " click");
    },
    addSize(number) {
      console.log(number);
      this.postSize += number;
    }
  }
};
</script>