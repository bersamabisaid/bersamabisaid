import RedirectPage from 'pages/Redirect';
import type { RouteConfig } from 'vue-router';

const shortlinkRoutes: RouteConfig[] = [
  {
    path: '/OprecKadivSGI',
    component: () => import('pages/GoogleForm.vue'),
    props: { gformId: '1FAIpQLSfojnZ_z5k3CA_scPVKw8a1LnRPwtCs4_AvVPMgzMu-koaPnQ' },
  },
  {
    path: '/FormOprecStaffSGI',
    // component: () => import('pages/GoogleForm.vue'),
    // props: { gformId: '1FAIpQLScjvuU3OhaAIpxR1_GxYVIBUNw-EvmaMlYeQbOJQgnqS4ElIA' },
    component: RedirectPage,
    props: { url: 'https://forms.gle/mnFoDb1JHgeWDLC37' },
  },
  {
    path: '/PanduanOprecStaffSGI',
    component: RedirectPage,
    props: { url: 'https://docs.google.com/document/d/e/2PACX-1vSAQwQZ2PUHWviT3GLQcqo9wvrRKUKUfld_HSMCe4SCSfBs38kGvgwJl2DUl1lgvA/pub' },
  },
];

export default shortlinkRoutes;
