<template>
  <v-app>
    <v-container>
      <!-- Netflix Logo -->
      <div class="d-flex justify-center align-center mt-4">
        <v-img
          :src="require('/Users/Public/Music/netflix-logo.png')"
          alt="Netflix Logo"
          max-height="600"
          max-width="150"
          contain
        ></v-img>
      </div>

      <h2 class="text-center mt-4">Netflix Analytics Dashboard</h2>

      <!-- Watch Time Chart -->
      <v-card class="pa-4 mt-4">
        <v-card-title>📊 Watch Time Analysis</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <WatchTimeChart v-if="watchTimeData.length" :data="watchTimeData" />
          <p v-else>No data available</p>
        </v-card-text>
      </v-card>

      <!-- Most Watched Shows Chart -->
      <v-card class="pa-4 mt-4">
        <v-card-title>🔥 Most Watched Shows</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <MostWatchedChart v-if="mostWatchedData.length" :data="mostWatchedData" />
          <p v-else>No data available</p>
        </v-card-text>
      </v-card>

      <!-- Device Usage Chart -->
      <v-card class="pa-4 mt-4">
        <v-card-title>💻📱 Device Usage Distribution</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <DeviceUsageChart v-if="deviceUsageData.length" :data="deviceUsageData" />
          <p v-else>No data available</p>
        </v-card-text>
      </v-card>
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

<style scoped>
h2 {
  font-weight: bold;
  color: #e50914;
}
</style>
