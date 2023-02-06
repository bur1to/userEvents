import { createRouter, createWebHistory } from 'vue-router';
import userPage from '@/pages/userPage';
import mainPage from '@/pages/mainPage';
const routes = [
  {
    path: '/',
    component: mainPage
  },
  {
    path: '/users/:id',
    component: userPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
