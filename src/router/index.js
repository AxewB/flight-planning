import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/trip-places',
      name: 'trip-places',
      component: () => import('@/views/TripPlacesView.vue'),
    },
    {
      path: '/trip/:id',
      children: [
        {
          path: '',
          name: 'trip',
          component: () => import('@/views/TripView.vue'),
        },
        {
          path: '*',
          redirect: '/'
        }
      ]
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('@/views/FriendListView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
