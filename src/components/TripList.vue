<template>
  <v-sheet v-if="!tripStore.trips.length">
    <EmptyPageWarning 
      title="Поездок нет"
      text="Создай план на первую поездку!">
      <template #actions>
        <v-btn @click="tripStore.addTrip">
          Создать
        </v-btn>
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
          size="40"
        />
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

// stores
const tripStore = useTripStore();

// router
const router = useRouter();
// methods
const moveToTrip = (id) => {
  router.push({name: "trip", params: {id}})
}
</script>
