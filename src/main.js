import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import './../node_modules/bulma/css/bulma.css';
import { routes } from './services/routes';
import { store } from './services/store';

Vue.config.productionTip = false;

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
