import { createRouter, createWebHistory } from 'vue-router';
import TimeAndDate from '../components/TimeAndDate.vue';


const routes = [    
  {
    path: '/time',
    name: 'TimeAndDate',
    component: TimeAndDate
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
