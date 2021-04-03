import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('pages/Homepage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '/program',
        name: 'ProgramList',
        component: () => import('pages/EventList.vue'),
      },
      {
        path: '/program/:programURL',
        name: 'Program',
        component: () => import('pages/Event.vue'),
      },
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
        path: 'events',
        name: 'AdminEventIndex',
        component: () => import('pages/admin/EventIndex.vue'),
      },
      {
        path: 'events/donation',
        name: 'AdminEventDonation',
        component: () => import('pages/admin/EventIndex.vue'),
        props: { donation: true },
      },
      {
        path: 'events/new',
        name: 'AdminEventAdd',
        component: () => import('pages/admin/EventForm.vue'),
        props: { formTitle: 'Tambah program' },
        meta: { transitionName: 'slideInRight' },
      },
      {
        path: 'events/new-donation',
        name: 'AdminEventAddDonation',
        component: () => import('pages/admin/EventForm.vue'),
        props: {
          formTitle: 'Tambah program donasi',
          donation: true,
        },
        meta: { transitionName: 'slideInRight' },
      },
      {
        path: 'events/:programURL',
        name: 'AdminEventEdit',
        component: () => import('pages/admin/EventForm.vue'),
        props: { formTitle: 'Edit program' },
      },
      {
        path: 'events/donation/:programURL',
        name: 'AdminEventDonationEdit',
        component: () => import('pages/admin/EventForm.vue'),
        props: { formTitle: 'Edit program', donation: true },
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
