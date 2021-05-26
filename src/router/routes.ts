import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Home',
    component: () => import('pages/Homepage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/program',
        name: 'ProgramList',
        component: () => import('pages/ProgramList.vue'),
      },
      {
        path: '/program/:programUrl',
        name: 'Program',
        component: () => import('pages/Program.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('pages/Profile.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
