import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Tables from '@/views/Tables.vue';
import YouTube from '@/views/YouTube.vue';
import Instagram from '@/views/Instagram.vue';
import Billing from '@/views/Billing.vue';
import VirtualReality from '@/views/VirtualReality.vue';
import Profile from '@/views/Profile.vue';
import Rtl from '@/views/Rtl.vue';
import SignIn from '@/views/SignIn.vue';
import Influencers from '@/views/Influencers.vue';
import NewInf from '@/views/NewInf.vue';
import SignUp from '@/views/SignUp.vue';

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/app',
  },
  {
    path: '/influencers',
    name: 'Influencers',
    component: Influencers,
  },
  {
    path: '/influencers/add',
    name: 'New Influencers',
    component: NewInf,
  },
  {
    path: '/influencers/:id',
    name: 'Edit Influencers',
    component: NewInf,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/telegram',
    name: 'Tables',
    component: Tables,
  },
  {
    path: '/yt',
    name: 'YouTube',
    component: YouTube,
  },
  {
    path: '/ig',
    name: 'Instagram',
    component: Instagram,
  },
  {
    path: '/billing',
    name: 'Billing',
    component: Billing,
  },
  {
    path: '/virtual-reality',
    name: 'Virtual Reality',
    component: VirtualReality,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/rtl-page',
    name: 'Rtl',
    component: Rtl,
  },
  {
    path: '/app',
    name: 'App',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

export default router;
