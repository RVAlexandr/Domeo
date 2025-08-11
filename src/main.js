import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { worker } from '../mocks/browser';

const initApp = async () => {
  const app = createApp(App);

  await worker.start();
  app.mount('#app');
};

initApp();
