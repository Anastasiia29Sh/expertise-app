<script setup>
import { ref, computed } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps(["data"]);

const labels = computed(() => props.data.map((item) => item.name));
const values = computed(() => props.data.map((item) => item.average_value));

const testData = ref({
  labels: labels.value,
  datasets: [
    {
      data: values.value,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
});
</script>

<template>
  <DoughnutChart :chartData="testData" class="chart" />
</template>

<style scoped lang="sass">
.chart
	height: 220px
</style>
