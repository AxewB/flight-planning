<template>
  <v-sheet 
    class="bg-transparent" 
    width="100%"
    height="100%"
  >
    <v-container>
      <v-row>
        <v-sheet class="py-8 px-4 text-h2">
          👋 Hello, {{ userStore.firstName }}
        </v-sheet>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet class="pa-4 text-h4">
            Your closest trip
          </v-sheet>
          <v-card
            class="mx-auto mb-4"
            max-width="400"
            elevation="10"
          >
            <v-img
              class="align-end text-white"
              height="200"
              :color="closestTrip.avatar.image ? '' : closestTrip.avatar.color"
              :src="closestTrip.avatar.image"
              cover
            >
              <v-card-title>{{ closestTrip.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              <VIcon icon="mdi-calendar"/> {{ closestTrip.date.begin }} - {{ closestTrip.date.end }}
            </v-card-subtitle>

            <v-card-text>
              <div>{{ closestTrip.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn 
                color="primary"
                @click="">
                Open
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <VDivider vertical/>
        <v-col>
          <v-sheet class="pa-4 text-h4">
            Upcoming trips
          </v-sheet>
          <TripList/>
        </v-col>
        <VDivider vertical/>
        <v-col>
          <v-sheet class="pa-4 text-h4">
            Friends
          </v-sheet>
          <FriendList short/>
        </v-col>
      </v-row>
    </v-container>

  </v-sheet>
</template>

<script setup>
import { computed } from 'vue'
import TripList from '@/components/TripList.vue';
import FriendList from '@/components/FriendList.vue';
import { useTripStore } from "@/stores/TripStore"
import { useUserStore } from "@/stores/UserStore"

const tripStore = useTripStore();
const userStore = useUserStore();

const closestTrip = computed(() => {
  return tripStore.closestTrip;
})
</script>
