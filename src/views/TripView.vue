<template>
  <v-sheet 
    class="bg-transparent d-flex flex-column pa-5">
    <v-sheet 
      class="d-flex flex-row pa-5" 
      rounded>
      <v-avatar 
        class="mr-5"
        size="160" 
        :color="trip.avatar.color" 
        rounded>
        <v-img :src="trip.avatar.image"></v-img>
      </v-avatar>
      <v-sheet class="bg-transparent flex-grow-1 d-flex flex-column">
        <v-sheet class="bg-transparent d-flex justify-space-between">
          <div class="text-h3 mb-5 text-h2 overflow-hidden">{{ trip.name }}</div>
          <v-sheet min-width="200px">
            <v-btn 
              icon
              elevation="0">
              <VIcon icon="mdi-image-remove"/>
              <VTooltip 
                activator="parent" 
                text="remove picture"
                location="bottom"/>
            </v-btn>
            <v-btn 
              icon
              elevation="0">
              <VIcon icon="mdi-trash-can"/>
              <VTooltip 
                activator="parent" 
                text="delete this trip (w/ confirmation)"
                location="bottom"/>
            </v-btn>
            <v-btn 
              icon
              elevation="0">
              <VIcon icon="mdi-content-copy"/>
              <VTooltip 
                activator="parent" 
                text="copy this trip (w/ confirmation)"
                location="bottom"/>
            </v-btn>
          </v-sheet>
        </v-sheet>
        <div>{{ trip.description }}</div>
      </v-sheet>
      <v-sheet class="bg-transparent d-flex flex-column fill-height">
        
      </v-sheet>
    </v-sheet>
    <VDivider class="my-4"/>
    <v-sheet class="d-flex flex-column">
      <v-sheet class="bg-transparent d-flex mb-4">
        <v-text-field 
          class="mx-2"
          variant="solo-filled" 
          label="begin date"
          type="date"
          hide-details
          v-model="trip.date.begin"
          prepend-icon="mdi-calendar"></v-text-field>
        <v-text-field 
          class="mx-2"
          variant="solo-filled" 
          label="end date"
          type="date"
          hide-details
          v-model="trip.date.end"
          prepend-icon="mdi-calendar"></v-text-field>
      </v-sheet>
      
    </v-sheet>
    <v-sheet class="d-flex flex-column">
      <v-sheet class="bg-transparent d-flex">
        <v-text-field 
          class="mx-2"
          variant="solo-filled" 
          label="budget"
          hide-details
          v-model="trip.budget"
          prefix="$"
          type="number"
          hide-spin-buttons
          prepend-icon="mdi-cash"></v-text-field>
        <v-text-field 
          class="mx-2"
          variant="solo-filled" 
          label=""
          hide-details
          prepend-icon="mdi-tag"></v-text-field>
        <v-text-field 
          class="mx-2"
          variant="solo-filled" 
          label="end date"
          hide-details></v-text-field>
      </v-sheet>
    </v-sheet>
    <VDivider class="my-4"/>
    <v-sheet 
      class="d-flex flex-row" 
      width="100%">
      <v-sheet class="flex-grow-1">
        <v-sheet 
          class="bg-transparent 
                text-h4 
                mb-2 
                d-flex 
                justify-space-between">
          Trip plan
          <v-sheet class="bg-transparent">
            <v-btn color="primary">ADD TASK</v-btn>
          </v-sheet>
        </v-sheet>
        
        <v-expansion-panels 
          variant="accordion"
          multiple>
          <v-expansion-panel
            v-for="(task) in trip.tasks" 
            :key="task.title + Date.now()"
            :title="task.title"
            :readonly="!task.subTasks">
            <template #text>
              <v-sheet 
                v-for="(subTask) in task.subTasks" 
                :key="subTask.title + Date.now()"
                width="100%"
                class="d-flex flex-row align-center py-2">
                <VIcon 
                  icon="mdi-menu" 
                  class="mx-2"/>
                <v-sheet>
                  <VTextField 
                    type="time" 
                    density="compact"
                    variant="underlined"
                    label="Time"
                    hide-details
                    v-model="subTask.time"
                    class="mx-2"/>
                </v-sheet>
                
                <VTextField 
                  density="compact"
                  variant="underlined"
                  label="Title"
                  hide-details
                  v-model="subTask.title"
                  class="mx-2"/>
                <v-sheet width="100px">
                  <VTextField 
                    type="number"
                    density="compact"
                    variant="underlined"
                    label="Cost"
                    hide-details
                    v-model="subTask.cost"
                    class="mx-2"/>
                </v-sheet>
                <v-sheet>
                  <v-btn icon="mdi-trash-can"></v-btn>
                </v-sheet>
              </v-sheet>
              <!-- <v-expansion-panels 
                variant="accordion"
                disabled>
                <v-expansion-panel
                  v-for="(subTask) in task.subTasks" 
                  :key="subTask.title + Date.now()"
                  :title="subTask.title + Date.now()">
                  
                </v-expansion-panel>
              </v-expansion-panels> -->
            </template>    
          </v-expansion-panel>
        </v-expansion-panels>
      </v-sheet>
      <VDivider 
        vertical 
        class="mx-2"/>
      <v-sheet class="d-flex flex-column">
        <v-sheet>
          <VTextarea 
            label="Notes" 
            variant="solo-filled" 
            prepend-inner-icon="mdi-comment"
            rows="10"
            v-model="trip.notes"/>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { ref, computed} from 'vue';
import { useRoute } from 'vue-router'
import { useTripStore } from "@/stores/TripStore"

//stores
const tripStore = useTripStore();

// router
const route = useRoute();

// data
const date_begin = ref(new Date());


// computed
const getShortDate = computed(() => {
  const day = date_begin.value.getDate();
  const month = date_begin.value.getMonth();
  const year = date_begin.value.getFullYear();
  return day + '/' + month + "/" + year;
})

const tripId = computed(() => {
  return route.params.id;
})

const trip = computed(() => {
  return tripStore.trips.find((trip) => trip.id === route.params.id)
})
</script>