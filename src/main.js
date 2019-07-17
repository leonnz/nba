import Vue from 'vue';
import App from './App.vue';
import './../node_modules/bulma/css/bulma.css';
import { store } from './services/store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
