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
      v-if="placeStore.places"
      :list="placeStore.places"
      tag="v-list"
      handle=".handle" 
      item-key="id"
      @end="saveAfterMoving()"
    >
      <template #item="{element: place}">
        <v-list-item>
          {{ place }}

        </v-list-item>
      </template>
    </draggable>
    <v-list v-if="placeStore.places">
      <v-list-item 
        v-for="place in placeStore.places" 
        :key="place.id"
        link
      >
        <PlaceEditOverlay
          title="Добавить место"
          @delete="removePlace"
          :activator="'parent'"
          :place="place"
        />
        <template #title>
          <v-sheet class="d-flex">
            <div class="mr-2">
              {{ place.name }}
            </div>
          </v-sheet>
        </template>
      </v-list-item>
    </v-list>
    <PlaceEditOverlay
      :isNew="true"
      v-model="isAddingPlace"
      title="Добавить место"
      @confirm="addPlace"
    />
    <!-- <v-overlay
      @click:outside="resetEditing()"
      :model-value="isEditingPlace"
      class="d-flex 
            justify-center 
            align-center"
    >
      <v-sheet 
        class="pa-4" >
        <VTextField
          v-model="placeToEdit.name"
          label="Название"
        />
        <v-sheet class="d-flex justify-end">
          <v-btn 
            class="mx-2"
            @click="resetEditing()"
          >
            Отмена
          </v-btn>
          <v-tooltip 
            v-if="mode === 'edit'"
            location="top"
            text="Место используется"
          >
            <template #activator="{ props }">
              <v-sheet v-bind="props">
                <v-btn
                  v-if="mode === 'edit'"
                  class="mx-2"
                  @click="removePlace(placeToEdit.id)"
                  color="error"
                  variant="outlined"
                  :disabled="isPlaceInUse(placeToEdit.name)"
                >
                  Удалить
                </v-btn>
              </v-sheet>
            </template>
          </v-tooltip>
          <v-btn 
            class="mx-2"
            @click="confirmEditing(placeToEdit)"
            color="primary"
          >
            Подтвердить
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-overlay> -->
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import { usePlaceStore} from '@/stores/PlaceStore'
import { draggable } from 'vuedraggable'
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

</script>
