<template>
  <v-overlay 
    v-model="isUserEdit" 
    class="d-flex justify-center align-center">
    <UserInfoEdit @closeWindow="isUserEdit = false"/>    
  </v-overlay>
  <v-layout>
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item
          :subtitle="userStore.email"
          :title="userStore.fullName"
          @click="isUserEdit = true"
        >
          <template #prepend>
            <v-avatar 
              :color="userStore.avatar.image ? '' : userStore.avatar.color" 
              :image="userStore.avatar.image"/>
          </template>
        </v-list-item>
      </v-list>
      <VDivider/>
      <v-list 
        nav 
        density="compact">
        <v-list-item 
          prepend-icon="mdi-home" 
          title="Dashboard" 
          :to="{name: 'dashboard'}"/>
        <v-list-item 
          prepend-icon="mdi-account-multiple" 
          title="Friends" 
          :to="{name: 'friends'}"/>
        <v-list-item 
          prepend-icon="mdi-map-marker" 
          title="Places" 
          :to="{name: 'trip-places'}"/>
        <VDivider/>
        <v-list-subheader>
          Trips
          <button icon="mdi-plus"></button>
        </v-list-subheader>
        <v-list-item 
          v-for="trip in tripList" 
          :key="trip.id"
          prepend-icon="mdi-square-rounded" 
          :color="trip.avatar.color"
          :title="trip.title"
          :to="{name: 'trip', params: {id: trip.id}}">
        </v-list-item>
        <v-list-item 
          class="d-flex justify-center"
          @click="addTrip()">
          <VIcon icon="mdi-plus"/>
        </v-list-item>
      </v-list>
      <template #append>
        <v-list 
          nav
          density="compact">
          <v-list-item 
            link
            @click="exampleOverwriteWarning = true">
            Load example
            <v-overlay v-model="exampleOverwriteWarning">
              <v-card 
                title="Are you sure?"
                text="This will overwrite all your data">
                <v-card-actions>
                  <v-btn @click="exampleOverwriteWarning = false">Cancel</v-btn>
                  <v-btn @click="loadExample()">Do it</v-btn>
                </v-card-actions>
              </v-card>
            </v-overlay>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main class="d-flex flex-column align-center bg-transparent">  
      <v-sheet 
        :width="pageSettings.fullWidth ? '100%' : '1200px'"
        class="bg-transparent">
        <RouterView/>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useTripStore } from '@/stores/TripStore';
import { useUserStore } from '@/stores/UserStore';
import { usePlaceStore } from '@/stores/PlaceStore';
import { useFriendStore } from '@/stores/FriendStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router'

import UserInfoEdit from '@/components/UserInfoEdit.vue'

const router = useRouter();
// stores
const tripStore = useTripStore();
const userStore = useUserStore();
const placeStore = usePlaceStore();
const friendStore = useFriendStore();

//data
const pageSettings = ref({
  fullWidth: false,
})
const isUserEdit = ref(false);
const exampleOverwriteWarning = ref(false);

const addTrip = () => {
  tripStore.addTrip();
  router.push({
    name: 'trip', 
    params: {
      id: tripStore.trips[tripStore.trips.length - 1].id
    }
  })
  
}

// computed
const tripList = computed(() => {
  return tripStore.trips;
})

// methods 
const loadExample = () => {
  tripStore.loadExample();
  userStore.loadExample();
  placeStore.loadExample();
  friendStore.loadExample();
  exampleOverwriteWarning.value = false;
}
</script>