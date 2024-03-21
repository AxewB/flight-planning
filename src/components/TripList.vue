<template>
  <v-sheet v-if="!tripStore.trips || tripStore.trips.length === 0">
    <EmptyPageWarning 
      title="No trips yet"
      text="Create your first trip">
      <template #actions>
        <v-btn @click="addTrip()">Create trip</v-btn>
      </template>
    </EmptyPageWarning>
  </v-sheet>
  <v-list 
    lines="two"
    v-else>
    <v-list-item 
      v-for="trip in tripStore.trips" 
      :key="trip.id"
      @click="moveToTrip(trip.id)">
      <template #prepend>
        <VAvatar  
          :image="trip.avatar.image"
          :color="!trip.avatar.image ? trip.avatar.color : ''"
          size="40"/>
      
      </template>
      <v-list-item-title>{{ trip.title }}</v-list-item-title>
      <v-list-item-subtitle>
        <VIcon icon="mdi-cash"/> {{ trip.budget }}
        <VIcon icon="mdi-calendar"/> {{ trip.date.begin }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { useTripStore } from "@/stores/TripStore";
import EmptyPageWarning from "@/components/EmptyPageWarning.vue";
import { useRouter } from 'vue-router'
const tripStore = useTripStore();
const router = useRouter();
const addTrip = async () => {
  const result = await tripStore.addTrip();
  console.log(result);
  if (result) {

    // router.push({name: "trip", params: {id: tripStore.trips[tripStore.trips.length - 1].id}})
  }
  
}
const moveToTrip = (id) => {
  router.push({name: "trip", params: {id}})
}
</script>
