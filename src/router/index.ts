import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    beforeEnter: (to: any, from: any, next: () => void) => {
      const { hash } = to;
      const split = hash.split('=');
      const hasToken = split[1] !== undefined;
      if (hash && hasToken) {
        store.commit('SET_AUTH_KEY', split[1]);
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
