import Index from '../pages/index.vue';
import About from '../pages/about.vue';

export const routes = [
  {
    name: 'Root',
    path: '/',
    component: Index
  },
  {
    name: 'About',
    path: '/about',
    component: About
  },
  {
    name: 'Sonics',
    path: '/sonics',
    component: Index
  },
  {
    name: 'Miami Vice',
    path: '/miami-vice',
    component: Index
  }
];
