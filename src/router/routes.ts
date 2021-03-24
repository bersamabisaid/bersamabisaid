import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  // {
  //   path: '',
  //   name: 'Home',
  //   component: () => import('pages/Homepage.vue'),
  // },
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '/',
        name: 'Program',
        component: () => import('pages/Homepage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
