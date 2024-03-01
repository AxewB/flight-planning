<template>
  <v-layout>
    <v-navigation-drawer>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          subtitle="sandra_a88@gmailcom"
          title="Sandra Adams"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list 
        nav 
        density="compact">
        <v-list-item 
          prepend-icon="mdi-home" 
          title="Dashboard" 
          :to="{name: 'dashboard'}"></v-list-item>
        <v-list-item 
          prepend-icon="mdi-account-multiple" 
          title="Friends" 
          :to="{name: 'friends'}"></v-list-item>
        <v-list-item 
          prepend-icon="mdi-calendar" 
          title="Calendar" 
          :to="{name: 'calendar'}"></v-list-item>
        <VDivider/>
        <v-list-subheader>
          Trips
          <button icon="mdi-plus"></button>
        </v-list-subheader>
        <v-list-item 
          v-for="trip in tripList" 
          :key="trip.id"
          prepend-icon="mdi-square-rounded" 
          :title="trip.name"
          :to="{name: 'trip', params: {id: trip.id}}">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar title="something">
      <v-sheet class="bg-transparent mr-5">
        
        <v-btn 
          icon
          @click="toggleFullWidth()">
          <VIcon icon="mdi-arrow-expand-horizontal"/>
          <VTooltip 
            activator="parent" 
            text="toggle full width"
            location="bottom"/>
        </v-btn>
        <v-btn icon>
          <VIcon icon="mdi-cog"/>
          <VTooltip 
            activator="parent" 
            text="settings"
            location="bottom"/>
          <v-menu activator="parent">
            <v-sheet>
              <v-list nav>
                <v-list-item 
                  prepend-icon="mdi-home" 
                  title="Dashboard" 
                  value="myfiles"></v-list-item>
                <v-list-item 
                  prepend-icon="mdi-account-multiple" 
                  title="Friends" 
                  value="shared"></v-list-item>
                <v-list-item 
                  prepend-icon="mdi-calendar" 
                  title="Calendar" 
                  value="calendar"></v-list-item>
              </v-list>
            </v-sheet>
          </v-menu>
        </v-btn>
      </v-sheet>
    </v-app-bar>
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
import { computed } from 'vue';

// stores
const tripStore = useTripStore();

//data
const pageSettings = ref({
  fullWidth: false,
})

// methods
const toggleFullWidth = () => {
  pageSettings.value.fullWidth = !pageSettings.value.fullWidth
}

// computed
const tripList = computed(() => {
  return tripStore.trips;
})
</script>