import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/materialize/font/icon.css';
import './assets/materialize/materialize.min.css';
import './assets/materialize/materialize.min';
import './assets/css/index.css';

const app = createApp(App);
app.use(store).use(router);

store.dispatch('tracks/loadTracks').then(() => {
  app.mount('#app');
});
