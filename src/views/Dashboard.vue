<template>
  <v-app>
  <v-container>
    <h2>Dashboard</h2>
    <WatchTimeChart :data="watchTimeData" />
    <MostWatchedChart :data="mostWatchedData" />
    <DeviceUsageChart :data="deviceUsageData" />
  </v-container>
</v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import WatchTimeChart from "@/components/WatchTimeChart.vue";
import MostWatchedChart from "@/components/MostWatchedChart.vue";
import DeviceUsageChart from "@/components/DeviceUsageChart.vue";

export default defineComponent({
  components: {
    WatchTimeChart,
    MostWatchedChart,
    DeviceUsageChart,
  },
  setup() {
    const watchTimeData = ref([]);
    const mostWatchedData = ref([]);
    const deviceUsageData = ref([]);

    return { watchTimeData, mostWatchedData, deviceUsageData };
  },
});
</script>
