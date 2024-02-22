<template>
  <v-sheet 
    width="100%"
    height="100vh"
    class="bg-transparent
          d-flex 
          flex-row 
          justify-start 
          align-start
          flex-wrap
          pa-5"
  >
    <v-sheet
      width="200"
      height="200"
      class="ma-2 
            d-flex 
            align-center
            justify-center
            bg-grey"
    >
      <v-icon>mdi-plus</v-icon>
    </v-sheet>
    
    <v-card
      v-for="trip in tripStore.trips" 
      :key="trip.id"
      rounded
      width="400"
      height="200"
      class="ma-2"
      :image="trip.image"
    >
      <v-sheet 
        class="pa-2 bg-transparent d-flex justify-center align-center"
        height="100%"
      >
        <v-sheet 
          class="bg-blurred d-flex justify-center pa-5 text-white text-h4"
          rounded
          width="100%"
        >
          {{ trip.name }}
        </v-sheet>
      </v-sheet>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { useTripStore } from '@/stores/TripStore';
const tripStore = useTripStore();

function addTrip() {
  // tripStore.addTrip();
  console.log('типа добавляю');
}

</script>

<style scoped>
.bg-blurred {
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
}
</style>