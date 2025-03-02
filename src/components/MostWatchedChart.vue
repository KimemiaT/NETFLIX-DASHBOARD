<template>
  <v-app>
  <v-card>
    <v-card-title>Top 5 Most Watched Titles</v-card-title>
    <v-card-text>
      <canvas ref="chartCanvas"></canvas>
    </v-card-text>
  </v-card>
</v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";
import type { ViewingData }from "../types";
Chart.register(...registerables);

export default defineComponent({
  props: { data: Array as () => ViewingData[] },
  setup(props) {
    const chartCanvas = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      if (!chartCanvas.value) return;

      const ctx = chartCanvas.value.getContext("2d")!;
      const titleCounts: Record<string, number> = {};

      props.data?.forEach(entry => {
        titleCounts[entry.title] = (titleCounts[entry.title] || 0) + entry.duration;
      });

      const sortedTitles = Object.entries(titleCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: sortedTitles.map(entry => entry[0]),
          datasets: [{ label: "Minutes Watched", data: sortedTitles.map(entry => entry[1]), backgroundColor: "rgba(255, 99, 132, 0.6)" }]
        }
      });
    });

    return { chartCanvas };
  }
});
</script>
