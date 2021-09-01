import shortlinkRoutes from 'src/router/shortlinks';
import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('pages/Homepage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '/program',
        name: 'ProgramList',
        component: () => import('pages/ProgramList.vue'),
      },
      {
        path: '/program/:programURL',
        name: 'Program',
        component: () => import('pages/Program.vue'),
      },
      {
        path: '/profil',
        name: 'Profile',
        component: () => import('pages/Profile.vue'),
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('pages/Blog.vue'),
      },
      // {
      //   path: '/form',
      //   name: 'FormEmbed',
      //   component: () => import('pages/GoogleForm.vue'),
      // },
      ...shortlinkRoutes,
    ],
  },
  {
    path: '/pay',
    name: 'Payment',
    component: () => import('pages/Pay.vue'),
  },
  {
    path: '/admin',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('pages/admin/Overview.vue'),
      },
      {
        path: 'programs',
        name: 'AdminProgramIndex',
        component: () => import('pages/admin/ProgramIndex.vue'),
      },
      {
        path: 'programs/donation',
        name: 'AdminProgramDonation',
        component: () => import('pages/admin/ProgramIndex.vue'),
        props: { donation: true },
      },
      {
        path: 'programs/new',
        name: 'AdminProgramAdd',
        component: () => import('pages/admin/ProgramForm.vue'),
        props: { formTitle: 'Tambah program' },
        meta: { transitionName: 'slideInRight' },
      },
      {
        path: 'programs/new-donation',
        name: 'AdminProgramAddDonation',
        component: () => import('pages/admin/ProgramForm.vue'),
        props: {
          formTitle: 'Tambah program donasi',
          donation: true,
        },
        meta: { transitionName: 'slideInRight' },
      },
      {
        path: 'programs/:programURL',
        name: 'AdminProgramEdit',
        component: () => import('pages/admin/ProgramForm.vue'),
        props: { formTitle: 'Edit program' },
      },
      {
        path: 'programs/donation/:programURL',
        name: 'AdminProgramDonationEdit',
        component: () => import('pages/admin/ProgramForm.vue'),
        props: { formTitle: 'Edit program', donation: true },
      },
      {
        path: 'programs/donation/:programURL/detail',
        name: 'AdminProgramDonationResult',
        component: () => import('pages/admin/ProgramDonationResult.vue'),
        meta: { transitionName: 'slideInRight' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: '404',
    path: '/404',
    alias: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
