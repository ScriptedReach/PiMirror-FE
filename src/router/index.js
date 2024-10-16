import { createRouter, createWebHistory } from 'vue-router';
import Clock from '../components/ClockComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Clock',
    component: Clock
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
