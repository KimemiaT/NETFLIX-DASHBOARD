<template>
  <v-app>
  <v-card>
    <v-card-title>Watch Time Per Hour</v-card-title>
    <v-card-text>
      <canvas ref="chartCanvas"></canvas>
    </v-card-text>
  </v-card>
</v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";
import type { ViewingData } from "../types";
Chart.register(...registerables);

export default defineComponent({
  props: { data: Array as () => ViewingData[] },
  setup(props) {
    const chartCanvas = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      if (!chartCanvas.value) return;

      const ctx = chartCanvas.value.getContext("2d")!;
      const hours = Array(24).fill(0);

      props.data?.forEach(entry => {
        const hour = entry.timestamp.getHours();
        hours[hour] += entry.duration;
      });

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          datasets: [{ label: "Minutes Watched", data: hours, backgroundColor: "rgba(75, 192, 192, 0.6)" }]
        }
      });
    });

    return { chartCanvas };
  }
});
</script>
