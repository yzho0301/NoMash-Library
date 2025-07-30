// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AccessDeniedView from '../views/AccessDeniedView.vue';
import FirebaseSignView from '@/views/FirebaseSignView.vue';
import FirebaseregisterView from '@/views/FirebaseregisterView.vue';
import LogoutView from '@/views/LogoutView.vue';
import AddBookView from '@/views/AddBookView.vue';
import WeatherView from '@/views/WeatherView.vue';
import CountBookAPI from '@/views/CountBookAPI.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'accessDenied',
    component: AccessDeniedView
  },
  {
    path:'/FireLogin',
    name: 'FireLogin',
    component: FirebaseSignView
  },
  {
    path:'/FireRegister',
    name: 'FireRegister',
    component: FirebaseregisterView
  },
  {
    path:'/logout',
    name: 'logout', 
    component: LogoutView
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/access-denied'); 
  } else {
    next();
  }
});

export default router;