<template>
  <div class="my-chart">
    <!-- <monthly-income></monthly-income> -->
  </div>
</template>

<script>
// import MonthlyIncome from "@/admin/components/MonthlyIncome"

export default {
  data() {
    return {
     data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    };
  },
  methods: {
    
  },
  components: {
    // MonthlyIncome
  }
};
</script>

<style lang="scss" scoped>
.my-chart {
  width: 600px;
  height: 600px;
}
</style>