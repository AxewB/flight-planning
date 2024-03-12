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
          <TextToTextField 
            :text="trip.title"
            v-model="trip.title"
            replacable-text="title"
            class="text-h3 mb-4"/>
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
          <TextToTextField 
            :text="trip.description"
            v-model="trip.description"
            replacable-text="description"/>
          <v-sheet class="flex-grow-1"></v-sheet>
        </v-sheet>
        
      </v-sheet>
      <v-sheet class="bg-transparent d-flex flex-column fill-height">
        
      </v-sheet>
    </v-sheet>
    <VDivider class="my-4"/>
    <v-sheet class="d-flex flex-column">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field 
              variant="solo-filled" 
              label="begin date"
              type="date"
              hide-details
              v-model="trip.date.begin"
              prepend-icon="mdi-calendar"></v-text-field>
          </v-col>
          <v-col >
            <v-text-field 
              variant="solo-filled" 
              label="end date"
              type="date"
              hide-details
              v-model="trip.date.end"
              prepend-icon="mdi-calendar"></v-text-field>

          </v-col>
        </v-row>
        <v-row>
          <v-col >
            <v-text-field 
              variant="solo-filled" 
              label="budget"
              hide-details
              v-model="trip.budget"
              prefix="$"
              type="number"
              hide-spin-buttons
              prepend-icon="mdi-cash"></v-text-field>
          </v-col>
          <v-col >
            <v-text-field 
              variant="solo-filled" 
              label=""
              type="number"
              hide-details
              prepend-icon="mdi-account-group"></v-text-field>    
          </v-col>
        </v-row>
      </v-container>
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
              class="mx-1"
              variant="text" 
              icon="mdi-pencil" 
              size="small"/>
            <v-btn 
              class="mx-1"
              color="primary"
              size="small"
              @click="isAddingTask = true">Add task</v-btn>
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
          <TripTasks :tasks="trip.tasks"/>
        </v-sheet>
        
      </v-sheet>
      <VDivider 
        vertical 
        class="mx-2"/>
      <v-sheet 
        class="d-flex flex-column"
        min-width="300px">
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
import draggable from "vuedraggable";
import TextToTextField from '@/components/TextToTextField.vue';
import TripTasks from "@/components/TripTasks.vue";

//stores
const tripStore = useTripStore();

// router
const route = useRoute();

// data
const date_begin = ref(new Date());
const isTitleEdit = ref(false);
const isDescriptionEdit = ref(false);
const isAddingTask = ref(false);
const testText = ref('');

//methods
const addTask = () => {
  tripStore.addTask(tripId.value);
}

const test = (i) => {
  console.log("something")
}

const closeEditingTitle = () => {
  isTitleEdit.value = false;
} 

const closeEditingDescription = () => {
  isDescriptionEdit.value = false;
} 

// computed
const tripTasks = computed({
  get(){
    return trip.value.tasks;
  },
  set(value) {
    trip.value.tasks = value;
  }
})

const tripId = computed(() => {
  return route.params.id;
})

const trip = computed(() => {
  return tripStore.trips.find((trip) => trip.id === tripId.value)
})

</script>