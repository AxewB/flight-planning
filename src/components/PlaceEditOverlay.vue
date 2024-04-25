<template>
  <v-overlay
    @click:outside="resetOverlay"
    @after-leave="resetOverlay"  
    :activator="props.activator"
    v-model="isOverlayShown"
    class="d-flex 
          justify-center 
          align-center"
  >
    <v-sheet 
      class="pa-4 rounded">
      <v-form v-model="isFormValid">
        <v-text-field
          v-model="placeToEdit.name"
          label="Название"
          autofocus
          :rules="[rules.required]"
        />
      </v-form>
      
      <v-sheet class="d-flex justify-end mt-4">
        <v-btn 
          class="mx-2"
          @click="closeOverlay"
          variant="text"
        >
          Отмена
        </v-btn>
        <v-tooltip 
          v-if="!isNew"
          location="top"
          text="Место используется"
          :disabled="!isPlaceInUse(placeToEdit.name)"
        >
          <template #activator="{ props }">
            <v-sheet v-bind="props">
              <v-btn
                class="mx-2"
                @click="removePlace"
                color="error"
                variant="text"
                :disabled="isPlaceInUse(placeToEdit.name)"
              >
                Удалить
              </v-btn>
            </v-sheet>
          </template>
        </v-tooltip>
        <v-btn 
          class="mx-2"
          @click="confirmEditing"
          color="primary"
          :disabled="!isFormValid"
        >
          Подтвердить
        </v-btn>
      </v-sheet>
    </v-sheet>
  </v-overlay>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, defineModel, computed } from 'vue';
import { useTripStore } from '@/stores/TripStore'
import { v4 as uuidv4 } from 'uuid';
import rules from '@/utils/rules';

// emits
const emit = defineEmits([
  'confirm', 
  'delete'
])

// props
const props = defineProps({
  title: {
    type: String,
    default: 'Add place'
  },
  place: {
    type: Object,
    default: () => {
      return { 
        id: uuidv4(),
        name: ''
      }
    }
  },
  isNew: {
    type: Boolean,
    default: false
  },
  activator: {
    type: String,
    default: ''
  },
})

// v-model
const isOverlayShown = defineModel({default: false})

// stores
const tripStore = useTripStore()

// data
const placeToEdit = ref({})
const isFormValid = ref(false)

// computed
const isPlaceInUse = computed(() => {
  return (name) => !(tripStore.tripPlaces.indexOf(name))
})

// methods
const confirmEditing = () => {
  emit('confirm', placeToEdit.value)
  resetOverlay()
}

const removePlace = () => {
  emit('delete', placeToEdit.value.id)
  resetOverlay()
}

const closeOverlay = () => {
  resetOverlay()
}

const resetOverlay = () => {
  if (props.isNew){
    placeToEdit.value = {
      id: uuidv4(),
      name: ''
    }
  }
  
  isOverlayShown.value = false
}

// life cycle
onMounted(() => {
  placeToEdit.value = props.place
})
</script>
