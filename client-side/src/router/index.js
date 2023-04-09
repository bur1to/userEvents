import { createRouter, createWebHistory } from 'vue-router';
import userPage from '@/pages/userPage';
import mainPage from '@/pages/mainPage';
import registrationPage from '@/pages/registrationPage';
import usersPage from '@/pages/usersPage';
import loginPage from '@/pages/loginPage';
import blogCreatePage from '@/pages/blogCreatePage';
import blogPage from '@/pages/blogPage';
import createEventPage from '@/pages/createEventPage';
import updateUserPage from '@/pages/updateUserPage';
import editBlogPage from '@/pages/editBlogPage';

const routes = [
  {
    path: '/',
    component: mainPage
  },
  {
    path: '/register',
    component: registrationPage
  },
  {
    path: '/users',
    component: usersPage
  },
  {
    path: '/create_blog',
    component: blogCreatePage
  },
  {
    path: '/login',
    component: loginPage
  },
  {
    path: '/edit_profile',
    component: updateUserPage
  },
  {
    path: '/blog',
    component: blogPage
  },
  {
    path: '/create_event',
    component: createEventPage
  },
  {
    path: '/profile',
    component: userPage
  },
  {
    path: '/edit_blog',
    component: editBlogPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
})

export default router;
