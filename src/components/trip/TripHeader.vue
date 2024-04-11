<template>
  <v-sheet 
    class="d-flex flex-row pa-5" 
    rounded
  >
    <v-avatar 
      class="mr-5"
      size="160" 
      :color="trip.avatar.color" 
      rounded
    >
      <VImg :src="trip.avatar.image"/>
    </v-avatar>
    <v-sheet 
      class="bg-transparent 
            flex-grow-1 
            d-flex 
            flex-column"
    >
      <v-sheet 
        class="bg-transparent 
              d-flex 
              justify-space-between"
      >
        <TextToTextField 
          :text="trip.title"
          v-model="trip.title"
          replacable-text="title"
          class="text-h3 mb-4"
          @update:model-value="saveTrip()"
        />

        <v-sheet min-width="300px">
          <v-btn 
            icon
            elevation="0"
          >
            <VIcon 
              icon="mdi-circle"
              :color="trip.avatar.color"
            />
            <VTooltip 
              activator="parent" 
              text="Avatar color"
              location="bottom"
            />
            <v-menu 
              activator="parent" 
              :close-on-content-click="false"
            >
              <v-sheet>
                <VColorPicker 
                  v-model="trip.avatar.color"
                  @update:model-value="saveTrip()"
                />
              </v-sheet>
            </v-menu>
          </v-btn>
          <v-btn 
            icon
            elevation="0"
          >
            <VIcon icon="mdi-image-edit" />
            <VTooltip 
              activator="parent" 
              text="Edit image"
              location="bottom"
            />
            <v-menu 
              activator="parent"
              :close-on-content-click="false"
            >
              <v-sheet 
                class="pa-4 
                      border 
                      d-flex 
                      flex-column 
                      justify-center 
                      align-center" 
                width="400px"
              >
                <v-sheet class="mb-4">
                  Изменить изображение поездки
                </v-sheet>
                <v-sheet 
                  class="d-flex" 
                  width=100%
                >
                  <VTextField
                    class="mx-2" 
                    density="compact"
                    hide-details
                    v-model="trip.avatar.image"
                    @update:model-value="saveTrip()"
                    label="Image url"
                  />
                  <v-btn 
                    icon
                    @click="tripStore.removeTripImage(tripId)"
                  >
                    <VIcon 
                      icon="mdi-trash-can"
                      color="error"
                      variant="text"
                    />
                    <VTooltip 
                      activator="parent" 
                      text="Remove image"
                      location="bottom"
                    />
                  </v-btn>
                </v-sheet>
              </v-sheet>
            </v-menu>
          </v-btn>
          <v-btn 
            icon
            elevation="0"
          >
            <VIcon icon="mdi-trash-can"/>
            <ConfirmationMenu 
              message="Удалить эту поездку?"
              @ok="removeTrip(tripId)"
            />
          </v-btn>
          <v-btn 
            icon
            elevation="0"
          >
            <VIcon icon="mdi-content-copy"/>
            <ConfirmationMenu 
              message="Копировать эту поездку?"
              @ok="copyTrip()"
            />
          </v-btn>
        </v-sheet>
      </v-sheet>
      <v-sheet>
        <TextToTextField 
          :text="trip.description"
          v-model="trip.description"
          replacable-text="Описание"
          @update:model-value="saveTrip()"
        />
        <VSheet class="flex-grow-1"/>
      </v-sheet>
    </v-sheet>
    <VSheet 
      class="bg-transparent 
            d-flex 
            flex-column 
            fill-height"
    />
  </v-sheet>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTripStore } from '@/stores/TripStore';
import TextToTextField from '@/components/TextToTextField.vue';
import ConfirmationMenu from "@/components/ConfirmationMenu.vue"

// stores
const tripStore = useTripStore();

// router
const router = useRouter();

// props
const props = defineProps({
  tripId: {
    type: String
  }
})

// computed
const trip = computed(() => {
  return tripStore.trips.find((trip) => trip.id === props.tripId)
})  

// methods
const removeTrip = async () => {
  const id = props.tripId
  const navigationResult = await router.push({name: 'dashboard'});
  if (!navigationResult){
    tripStore.removeTrip(id);
  }
}

const copyTrip = () => {
  const cpId = tripStore.copyTrip(trip.value);
  router.push({name: 'trip', params: {id: cpId}});
}

let interval = null;
function saveTrip() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    tripStore.saveToLocalStorage();
    clearInterval(interval);
  }, 500);
}
</script>
