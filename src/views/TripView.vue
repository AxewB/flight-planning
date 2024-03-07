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
          <div 
            v-if="!isTitleEdit"
            class="text-h3 mb-5 text-h2 overflow-hidden"
            @click="isTitleEdit = true">
            {{ trip.name ? trip.name : 'Trip name' }}
          </div>
          <v-text-field 
            v-else
            v-model="trip.name"
            autofocus
            variant="underlined"
            @keydown.enter.prevent="isTitleEdit = false">
            

          </v-text-field>
          <v-sheet min-width="200px">
            <v-btn 
              icon
              elevation="0">
              <VIcon 
                icon="mdi-circle"
                :color="trip.avatar.color"/>
              <VTooltip 
                activator="parent" 
                text="Avatar color"
                location="bottom"/>
              <v-menu 
                activator="parent" 
                :close-on-content-click="false">
                <v-sheet>
                  <v-color-picker v-model="trip.avatar.color"></v-color-picker>
                </v-sheet>
              </v-menu>
            </v-btn>
            <v-btn 
              icon
              elevation="0">
              <VIcon 
                icon="mdi-image-edit" />
              <VTooltip 
                activator="parent" 
                text="Edit image"
                location="bottom"/>
              <v-menu 
                activator="parent"
                :close-on-content-click="false">
                <v-sheet 
                  class="pa-4 d-flex" 
                  width="400px">
                  <v-text-field
                    class="mx-2" 
                    density="compact"
                    hide-details
                    v-model="trip.avatar.image"
                    label="Image url"/>
                  <v-btn 
                    icon
                    @click="tripStore.removeTripImage(tripId)">
                    <VIcon 
                      icon="mdi-trash-can"
                      color="error"
                      variant="text"/>
                    <v-tooltip 
                      activator="parent" 
                      text="Remove image"
                      location="bottom"/>
                  </v-btn>
                </v-sheet>
              </v-menu>
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
        <v-sheet>
          <div  
            v-if="!isDescriptionEdit"
            class="flex-grow-1"
            @click="isDescriptionEdit = true">
            {{ trip.description ? trip.description : 'Trip description' }}
          </div>
          <VTextField 
            v-else 
            v-model="trip.description"
            autofocus
            variant="underlined"
            @keydown.enter.prevent="isDescriptionEdit = false"/>
          <v-sheet class="flex-grow-1"></v-sheet>
        </v-sheet>
        
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
            <v-btn 
              color="primary" 
              @click="isAddingTask = true">ADD TASK</v-btn>
          </v-sheet>
        </v-sheet>
        <v-sheet class="bg-transparent d-flex flex-column justify-center align-center">
          <v-overlay 
            v-model="isAddingTask" 
            class="d-flex justify-center align-center">
            <TaskSettingsForm @closeWindow="isAddingTask = false"/>    
          </v-overlay>
          <EmptyPageWarning 
            v-if="trip.tasks.length === 0" 
            title="No tasks" 
            text="Add tasks"/>
          <v-expansion-panels 
            v-else
            variant="accordion"
            multiple>
            <v-expansion-panel
              v-for="(task, taskIndex) in trip.tasks" 
              :key="task.id"
              
              :readonly="!task.subTasks">
              <template #title> 
                <v-sheet 
                  class="d-flex align-center" 
                  width="100%">
                  <div class="text-overline">
                    DAY {{ taskIndex + 1 }}
                  </div>
                  <VDivider 
                    class="mx-2" 
                    vertical/>
                  <div>{{ task.title }}</div>
                  <v-sheet class="flex-grow-1 d-flex align-center justify-end">
                    <div class="mx-2 text-overline">{{ task.date }}</div>
                  </v-sheet>
                </v-sheet>
              </template>
              <template #text>
                <v-sheet 
                  v-for="(subTask) in task.subTasks" 
                  :key="subTask.id"
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
              </template>    
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
        
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
import EmptyPageWarning from '@/components/EmptyPageWarning.vue';
import TaskSettingsForm from '@/components/TaskSettingsForm.vue';
//stores
const tripStore = useTripStore();

// router
const route = useRoute();

// data
const date_begin = ref(new Date());
const isTitleEdit = ref(false);
const isDescriptionEdit = ref(false);
const isAddingTask = ref(false);

//methods
const addTask = () => {
  tripStore.addTask(tripId.value);
}


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