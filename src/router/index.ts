import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('/@/pages/Index.vue'),
  },
  {
    name: 'Board',
    path: '/board/:id',
    component: () => import('/@/pages/Board.vue'),
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
