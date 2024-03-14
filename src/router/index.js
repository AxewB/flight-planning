import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import TripView from '@/views/TripView.vue';
import FriendListView from '@/views/FriendListView.vue';
import CalendarView from '@/views/CalendarView.vue';
import TripPlacesView from '@/views/TripPlacesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/test',
      name: 'test',
      component: TripView,
    },
    {
      path: '/trip-places',
      name: 'trip-places',
      component: TripPlacesView,
    },
    {
      path: '/trip/:id',
      children: [
        {
          path: '',
          name: 'trip',
          component: TripView,
        },
        {
          path: '*',
          redirect: '/'
        }
      ]
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendListView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
