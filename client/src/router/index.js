import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import(/* webpackChunkName: "home" */ '../views/Home');
    },
  },
  {
    path: '/trackLists',
    name: 'TrackLists',
    component: function () {
      return import(/* webpackChunkName: "trackLists" */ '../views/TrackLists');
    },
  },
  {
    path: '/createTrack',
    name: 'CreateTrack',
    component: function () {
      return import(/* webpackChunkName: "createTrack" */ '../views/CreateTrack');
    },
  },
  {
    path: '/track/:id',
    name: 'Track',
    component: function () {
      return import(/* webpackChunkName: "track" */ '../views/Track');
    },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

export default router;
