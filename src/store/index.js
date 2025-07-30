import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AboutView from '../views/AboutView.vue';
import HomeView from '../views/HomeView.vue';
import FirebaseRegister from '@/views/FirebaseRegister.vue'
import FirebaseSignin   from '@/views/FirebaseSigninView.vue'
import LogoutView from '@/views/LogoutView.vue';  
import AddBookView from '@/views/AddBookView.vue';
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
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegister  
  },
  {
    path: '/FireLogin', 
    name: 'FireLogin',
    component: FirebaseSignin
  },
  {
    path: '/logout',
    name: 'logout', 
    component: LogoutView
  },
  {
    path: '/add-book',
    name: 'AddBook', 
    component: AddBookView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // 你可以在真实的项目中使用 Vuex 或 Pinia 来管理这个状态
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});