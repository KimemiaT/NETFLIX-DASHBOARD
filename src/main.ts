// main.ts
import { createApp } from "vue";
import App from "../src/App.vue";
import vuetify from "../src/plugins/vuetify"; // Ensure Vuetify is imported

const app = createApp(App);
app.use(vuetify);
app.mount("#app");
