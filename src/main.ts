import './styles';
import jq from 'jquery';
import { addHistoryListener } from './utils/listen-history';
import { createApp } from 'vue';
import App from './App.vue';
import { pageInit } from './pageInit';

createApp(App).mount(
  (() => {
    const app = document.createElement('div');

    document.body.append(app);
    return app;
  })()
);

addHistoryListener('history', () => {
  console.log('监听到路由变化');
  pageInit();
});

window.$ = jq;
