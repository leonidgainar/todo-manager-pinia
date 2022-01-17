import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import { plugin as storePlugin } from "./store";

import router from "./router";

import VeeValidatePlugin from "./plugin/validation";

const app = createApp(App);

app.use(router);
app.use(storePlugin);
app.use(VeeValidatePlugin);

app.mount("#app");
