import { Component, createApp } from 'vue';

export function vueMount(component: Component, selectDom: string | Element) {
  const app = createApp(component);

  app.mount(selectDom);
  return app;
}
