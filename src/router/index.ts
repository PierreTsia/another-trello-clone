import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '/@/store/auth.store';
import { storeToRefs } from 'pinia';

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
    meta: {
      requiresAuth: true,
    },
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});

Router.beforeResolve(async (to, from, next) => {
  const authStore = useAuth();
  const { isLoggedIn } = storeToRefs(authStore);
  console.log('isLoggedIn', isLoggedIn.value);
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    console.log('requires auth');
    await authStore.getCurrentUser();
    return isLoggedIn.value ? next() : next('/');
  }

  return next();
});
