import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";

export const plugin = (app) => {
  const pinia = createPinia();

  pinia.use(createPersistedStatePlugin());

  app.use(pinia);
};
