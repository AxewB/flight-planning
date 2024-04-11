<template>
  <v-overlay 
    :close-on-content-click="false"
    v-model="isUserEdit" 
    class="d-flex 
          justify-center 
          align-center"
  >
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
              :image="userStore.avatar.image"
            />
          </template>
        </v-list-item>
      </v-list>
      <VDivider/>
      <v-list 
        nav 
        density="compact"
      >
        <VListItem 
          prepend-icon="mdi-home" 
          title="Главная" 
          :to="{name: 'dashboard'}"
        />
        <VListItem 
          prepend-icon="mdi-account-multiple" 
          title="Друзья" 
          :to="{name: 'friends'}"
        />
        <VListItem 
          prepend-icon="mdi-map-marker" 
          title="Места" 
          :to="{name: 'trip-places'}"
        />
        <VDivider/>
        <v-list-subheader>
          Поездки
        </v-list-subheader>
        <VListItem 
          v-for="trip in tripList" 
          :key="trip.id"
          prepend-icon="mdi-square-rounded" 
          :color="trip.avatar.color"
          :title="trip.title"
          :to="{name: 'trip', params: {id: trip.id}}"
        />
        
        <v-list-item 
          class="d-flex justify-center"
          @click="addTrip()"
        >
          <VIcon icon="mdi-plus"/>
        </v-list-item>
      </v-list>
      <template #append>
        <v-list 
          nav
          density="compact"
        >
          <v-list-item 
            link
            @click="isGoingToReset = true"
          >
            <VIcon icon="mdi-code-json"/>
            
            Сбросить данные
            
            <ConfirmationOverlay 
              title="Вы уверены?"
              text="Это сотрет все данные"
              :isConfirmationShow="isGoingToReset"
              @confirm="resetData()"
              @cancel="isGoingToReset = false"
            />
          </v-list-item>
          <v-list-item 
            link
            @click="isGoingToOverwrite = true"
          >
            <VIcon icon="mdi-code-json"/>
            
            Загрузить пример
            
            <ConfirmationOverlay 
              title="Вы уверены?"
              text="Это перезапишет все данные"
              :isConfirmationShow="isGoingToOverwrite"
              @confirm="loadExample()"
              @cancel="isGoingToOverwrite = false"
            />
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    
    <v-main 
      class="d-flex 
            flex-column 
            align-center 
            bg-transparent"
    > 
      <v-sheet 
        width="1200px"
        class="bg-transparent"
      >
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
import { useRouter, useRoute } from 'vue-router'
import ConfirmationOverlay from '@/components/ConfirmationOverlay.vue';
import UserInfoEdit from '@/components/UserInfoEdit.vue'

// router
const router = useRouter();
const route = useRoute();

// stores
const tripStore = useTripStore();
const userStore = useUserStore();
const placeStore = usePlaceStore();
const friendStore = useFriendStore();

// data
const isUserEdit = ref(false);
const isGoingToOverwrite = ref(false);
const isGoingToReset = ref(false)

// computed
const tripList = computed(() => {
  return tripStore.trips;
})

// methods
const addTrip = () => {
  tripStore.addTrip();
  router.push({
    name: 'trip', 
    params: {
      id: tripStore.trips[tripStore.trips.length - 1].id
    }
  })
  
}

const loadExample = () => {
  tripStore.loadExample();
  userStore.loadExample();
  placeStore.loadExample();
  friendStore.loadExample();
  isGoingToOverwrite.value = false;
}

const resetData = async () => {
  let navigationResult = true
  
  if (route.name == 'dashboard') 
    navigationResult = false
  else
    navigationResult = await router.push({name: 'dashboard'});

  if (!navigationResult){
    tripStore.resetStore();
    userStore.resetStore();
    placeStore.resetStore();
    friendStore.resetStore();
    isGoingToReset.value = false;
  }
}
</script>