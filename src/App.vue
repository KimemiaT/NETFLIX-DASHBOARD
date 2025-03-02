<template>
  <v-app>
    <v-container>
      <v-btn @click="toggleTheme" class="mb-4">{{ themeText }}</v-btn>
      <FileUpload @dataLoaded="processData" />

      <v-row>
        <v-col cols="12" md="6">
          <WatchTimeChart v-if="processedData.length" :data="processedData" />
        </v-col>
        <v-col cols="12" md="6">
          <MostWatchedChart v-if="processedData.length" :data="processedData" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <DeviceUsageChart v-if="processedData.length" :data="processedData" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import FileUpload from "./components/FileUpload.vue";
import WatchTimeChart from "../src/components/WatchTimeChart.vue";
import MostWatchedChart from "../src/components/MostWatchedChart.vue";
import DeviceUsageChart from "../src/components/DeviceUsageChart.vue";
import type { ViewingData } from "./types";


import { useTheme } from "vuetify";

export default defineComponent({
  components: { FileUpload, WatchTimeChart, MostWatchedChart, DeviceUsageChart },
  setup() {
    const processedData = ref<ViewingData[]>([]);
    const theme = useTheme();

    const themeText = computed(() => theme.global.name.value === "light" ? "Dark Mode" : "Light Mode");

    const processData = (data: any[]) => {
      processedData.value = data.map(row => ({
        title: row["Title"],
        duration: parseInt(row["Duration"]) || 0,
        device: row["Device Type"],
        timestamp: new Date(row["Start Time"]),
      }));
    };

    const toggleTheme = () => {
      theme.global.name.value = theme.global.name.value === "light" ? "dark" : "light";
    };

    return { processedData, processData, toggleTheme, themeText };
  },
});
</script>
