<template>
  <v-sheet 
    height="100%" 
    width="100%">
    <MainView/>
  </v-sheet>
</template>

<script setup>
import { onMounted } from 'vue';
import MainView from './views/MainView.vue';
import { useUserStore } from './stores/UserStore';
import { useTripStore } from './stores/TripStore';
import { useFriendStore } from './stores/FriendStore';
import { usePlaceStore } from './stores/PlaceStore';

const placeStore = usePlaceStore();
const friendStore = useFriendStore();
const tripStore = useTripStore();
const userStore = useUserStore();

onMounted(() => {
  placeStore.loadFromLocalStorage();
  friendStore.loadFromLocalStorage();
  tripStore.loadFromLocalStorage();
  userStore.loadFromLocalStorage();
})  
</script>
