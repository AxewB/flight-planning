<template>
  <v-sheet class="pa-4">
    <v-sheet class="d-flex justify-space-between">
      <v-sheet class="text-h4">
        Your places
      </v-sheet>
      <v-btn 
        @click="addPlace()"
        color="primary">Add place</v-btn>
    </v-sheet>
    <VDivider 
      thickness="2" 
      class="my-4"/>
    <v-list v-if="placeStore.places">
      <v-list-item 
        v-for="place in placeStore.places" 
        :key="place.id"
        @click="editPlace(place)">
        <template #title>
          <v-sheet class="d-flex">
            <div class="mr-2">
              {{ place.name }}
            </div>
          </v-sheet>
          
        </template>
      </v-list-item>
      
    </v-list>
    <v-overlay
      :model-value="isEditingPlace"
      class="d-flex justify-center align-center">
      <v-sheet 
        class="pa-4" 
        width="400px">
        <v-text-field 
          v-model="placeToEdit.name"
          label="Name"/>
        <v-sheet class="d-flex justify-end">
          <v-btn 
            class="mx-2"
            @click="cancelEditing()">
            Cancel
          </v-btn>
          <v-tooltip 
            v-if="mode === 'edit'"
            location="top">
            <template #activator="{ props }">
              <v-sheet v-bind="props">
                <v-btn
                  v-if="mode === 'edit'"
                  class="mx-2"
                  @click="removePlace(placeToEdit.id)"
                  color="error"
                  variant="outlined">
                  <v-tooltip>
                    <span>Place in use</span>
                  </v-tooltip>
                  Delete
                </v-btn>
              </v-sheet>
              
            </template>
          </v-tooltip>
          

          <v-btn 
            class="mx-2"
            @click="confirmEditing(placeToEdit)"
            color="primary">
            Confirm
          </v-btn>
        </v-sheet>
        
      </v-sheet>
    </v-overlay>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlaceStore} from '@/stores/PlaceStore'
import { useTripStore } from "@/stores/TripStore"
import { v4 as uuidv4 } from 'uuid';

const placeStore = usePlaceStore()
const tripStore = useTripStore()
const placeToEdit = ref({})
const isEditingPlace = ref(false)
const mode = ref('');

const isPlaceInUse = computed(() => {
  return false
  // return tripStore.tripPlaces
  // return (name) => !(tripStore.tripPlaces.indexOf(name) === -1)
})

const addPlace = () => {
  placeToEdit.value = {
    id: uuidv4(),
    name: ''
  }
  mode.value = 'add'
  isEditingPlace.value = true
}

const resetEditing = () => {
  placeToEdit.value = {}
  mode.value = ''
  isEditingPlace.value = false
}
const removePlace = (id) => {
  placeStore.removePlace(id);
  resetEditing();
}
const editPlace = (place) => {
  const newPlace = { ...place }
  placeToEdit.value = newPlace;
  mode.value = 'edit'
  isEditingPlace.value = true
}
const cancelEditing = () => {
  resetEditing();
}
const confirmEditing = (newPlace) => {
  if (mode.value) {
    switch (mode.value) {
    case 'add':
      placeStore.addPlace(newPlace);
      break;
    case 'edit':
      placeStore.updatePlace(newPlace);
      break;
    }
    placeStore.saveToLocalStorage();
  }
  resetEditing();
}

</script>
