<template>
  <v-sheet 
    class="bg-transparent" 
    width="100%"
    height="100%"
  >
    
    <!-- this is home page -->
    <!-- (there will be list of trips, short trip description (example: date, cost), and ability to add new trip) -->
    <TripList/>
    <!-- <TripCreateForm />  -->
  </v-sheet>
</template>

<script setup>
import TripCreateForm from '@/components/TripCreateForm.vue';
import TripList from '@/components/TripList.vue';

</script>
