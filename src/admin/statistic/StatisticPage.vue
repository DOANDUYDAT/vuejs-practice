<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="3">
        <v-select :items="months" label="Tháng" v-model="time.month"></v-select>
      </v-col>
      <v-col cols="3">
        <v-select :items="years" label="Năm" v-model="time.year"></v-select>
      </v-col>
      <v-col cols="3">
        <v-btn class="gg-red white--text">VIEW</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { statisticService } from '@/_api';

export default {
  data() {
    return {
      time: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
      statistic: null,
      months: [
        { text: 'Tháng 1', value: 1 },
        { text: 'Tháng 2', value: 2 },
        { text: 'Tháng 3', value: 3 },
        { text: 'Tháng 4', value: 4 },
        { text: 'Tháng 5', value: 5 },
        { text: 'Tháng 6', value: 6 },
        { text: 'Tháng 7', value: 7 },
        { text: 'Tháng 8', value: 8 },
        { text: 'Tháng 9', value: 9 },
        { text: 'Tháng 10', value: 10 },
        { text: 'Tháng 11', value: 11 },
        { text: 'Tháng 12', value: 12 }
      ],
      years: [
        { text: 'Năm 2017', value: 2017 },
        { text: 'Năm 2018', value: 2018 },
        { text: 'Năm 2019', value: 2019 }
      ]
    }
  },
  methods: {
    async getData() {
      let time = this.time;
      console.log('getStatistic');
      this.statistic = await statisticService.getStatistic(time);
    }
  }, created() {
    this.getData();
  }
}
</script>