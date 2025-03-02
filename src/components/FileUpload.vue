<template>
  <v-app>
  <v-container>
    <v-file-input
      label="Upload Netflix Data CSV"
      @change="handleFileUpload"
      accept=".csv"
    ></v-file-input>
  </v-container>
</v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Papa from "papaparse";

export default defineComponent({
  emits: ["dataLoaded"],
  methods: {
    handleFileUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        Papa.parse(file, {
          complete: (results) => {
            this.$emit("dataLoaded", results.data);
          },
          header: true,
        });
      }
    },
  },
});
</script>
