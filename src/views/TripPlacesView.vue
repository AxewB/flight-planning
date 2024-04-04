<template>
  <v-sheet class="pa-4">
    <v-sheet 
      class="d-flex 
            justify-space-between"
    >
      <v-sheet class="text-h4">
        Список мест
      </v-sheet>
      <v-btn 
        @click="isAddingPlace = true"
        color="primary"
      >
        Добавить место
      </v-btn>
    </v-sheet>
    <VDivider 
      thickness="2" 
      class="my-4"
    />
    <draggable
      :list="placeStore.places"
      tag="v-sheet"
      handle=".handle" 
      item-key="id"
      @end="saveAfterMoving()"
    >
      <template #item="{element: place}">
        
        <v-list-item
          class="d-flex pa-2 rounded" 
          link
          :ripple="true"
          :title="place.name"
        >
          <template #prepend>
            <VIcon 
              class="handle" 
              size="30" 
              icon="mdi-drag"
            />
          </template>
          <template #default>
            <PlaceEditOverlay
              title="Добавить место"
              @delete="removePlace"
              :activator="'parent'"
              :place="place"
            />
          </template>
        </v-list-item>
      </template>
    </draggable>
    <PlaceEditOverlay
      isNew
      v-model="isAddingPlace"
      title="Добавить место"
      @confirm="addPlace"
    />
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import { usePlaceStore} from '@/stores/PlaceStore'
import draggable from 'vuedraggable'
import PlaceEditOverlay from '@/components/PlaceEditOverlay.vue'

// stores
const placeStore = usePlaceStore()

const isAddingPlace = ref(false)

const addPlace = (place) => {
  placeStore.addPlace(place)
}

const removePlace = (id) => {
  placeStore.removePlace(id);
}

const saveAfterMoving = () => {
  placeStore.saveToLocalStorage();  
}
</script>
