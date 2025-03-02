<template>
    <v-app>
    <v-card>
      <v-card-title>Device Usage Breakdown</v-card-title>
      <v-card-text>
        <canvas ref="chartCanvas"></canvas>
      </v-card-text>
    </v-card>
</v-app>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { Chart, registerables } from "chart.js";
  import type  { ViewingData } from "../types";
  Chart.register(...registerables);
  
  export default defineComponent({
    props: { data: Array as () => ViewingData[] },
    setup(props) {
      const chartCanvas = ref<HTMLCanvasElement | null>(null);
  
      onMounted(() => {
        if (!chartCanvas.value) return;
  
        const ctx = chartCanvas.value.getContext("2d")!;
        const deviceCounts: Record<string, number> = {};
  
        props.data?.forEach(entry => {
          deviceCounts[entry.device] = (deviceCounts[entry.device] || 0) + entry.duration;
        });
  
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: Object.keys(deviceCounts),
            datasets: [
              {
                label: "Minutes Watched",
                data: Object.values(deviceCounts),
                backgroundColor: [
                  "#FF6384", // Red
                  "#36A2EB", // Blue
                  "#FFCE56", // Yellow
                  "#4BC0C0", // Teal
                  "#9966FF", // Purple
                ],
              },
            ],
          },
        });
      });
  
      return { chartCanvas };
    },
  });
  </script>
  