// src/plugins/vuetify.ts
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles"; // Ensure styles are imported

export default createVuetify({
  components,
  directives,
});
