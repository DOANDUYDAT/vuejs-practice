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
        <v-btn class="gg-red white--text" @click="getData">VIEW</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <bar-chart :chart-data="datacollectionBar"></bar-chart>
      </v-col>
      <v-col cols="6">
        <pie-chart :chart-data="datacollectionPie"></pie-chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { statisticService } from '@/_api';
import BarChart from './BarChart';
import PieChart from './PieChart';


export default {
  data() {
    return {
      time: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
      statistic: null,
      datacollectionBar: {},
      datacollectionPie: {},
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
      ]
    }
  },
  components: {
    BarChart,
    PieChart
  },
  computed: {
    years() {
      const d = new Date();
      const currentYear = d.getFullYear();
      let years = [];
      for (let i = 0; i < 5; i++) {
        let year = currentYear - i
        years.push({
          text: 'Năm ' + year,
          value: year
        })
      }
      return years
    }
  },
  methods: {
    setDataBarChart(statistic) {
      this.datacollectionBar = {
        labels: ['Thu Chi'],
        datasets: [
          {
            label: 'Import',
            backgroundColor: this.randomColor(),
            data: [statistic.importTotalSum / 1000000, 0]
          },
          {
            label: 'Export',
            backgroundColor: this.randomColor(),
            data: [statistic.exportTotalSum / 1000000, 0]
          }
        ]
      }
    },
    setDataPieChart(statistic) {
      const labels = statistic.exportProductMax.map(e => {
        return e.supplier + ' ' + e.name
      })
      let datasets = [{
        backgroundColor: [],
        data: []
      }]
      statistic.exportProductMax.forEach(e => {
        datasets[0].backgroundColor.push(this.randomColor())
        datasets[0].data.push(e.quantity)
      })
      this.datacollectionPie = {
        labels,
        datasets
      }
    },
    randomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    async getData() {
      let time = this.time;
      console.log('getStatistic');
      this.statistic = await statisticService.getStatistic(time);
      const statistic = this.statistic;
      this.setDataBarChart(statistic);
      this.setDataPieChart(statistic);
    }
  }, created() {
    this.getData();
  }
}
</script>