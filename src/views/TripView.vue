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
                  <VColorPicker v-model="trip.avatar.color"/>
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
                justify-start 
                align-center">
          Trip plan
          
          <v-sheet 
            class="mx-2 text-caption text-error bg-transparent d-flex justify-start align-center">
            <v-sheet 
              v-for="(alert, alertName) in taskAlerts" 
              :key="alertName">
              <v-chip 
                v-if="alert.value"
                :color="alert.type"
                size="small"
                class="mx-1"
                :closable="alert.type !== 'error'"
                @click:close="alert.resetValue()">
                {{ alert.label}}{{ alert.showValue ? ` ${alert.value}` : '' }}
              </v-chip>
            </v-sheet>
          </v-sheet>
          <v-sheet class="bg-transparent d-flex justify-end align-center flex-grow-1">
            
            <v-btn 
              class="mx-1"
              icon
              size="small"
              rounded
              variant="text">
              <VIcon 
                icon="mdi-filter-menu"/>
              <v-menu 
                activator="parent"
                :close-on-content-click="false">
                <v-sheet>
                  <v-container>
                    <v-row>
                      <v-col 
                        cols="1" 
                        class="d-flex justify-center align-center">
                        <VIcon icon="mdi-calendar"/>  
                      </v-col>
                      <v-col>
                        <v-text-field 
                          variant="solo-filled" 
                          label="begin date"
                          type="date"
                          hide-details
                          density="compact"
                          clearale
                          v-model="tasksFilters.date.begin"/>
                      </v-col>
                      <v-col>
                        <v-text-field 
                          variant="solo-filled" 
                          label="end date"
                          type="date"
                          density="compact"
                          hide-details
                          v-model="tasksFilters.date.begin"/>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                        cols="1" 
                        class="d-flex justify-center align-center">
                        <VIcon icon="mdi-cash"/>  
                      </v-col>
                      <v-col>
                        <v-text-field 
                          variant="solo-filled" 
                          label="cost"
                          type="number"
                          hide-details
                          hide-spin-buttons
                          density="compact"
                          clearable
                          v-model="tasksFilters.cost"/>
                      </v-col>
                      
                    </v-row>
                    <v-row>
                      <v-col class="d-flex justify-end">
                        <v-btn 
                          @click="resetFilters()"
                          color="warning"
                          variant="tonal">
                          Reset
                        </v-btn>
                        <v-btn 
                          @click="applyFilterSettings()" 
                          color="primary"
                          class="ml-2">Apply</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-sheet>
                
              </v-menu>
            </v-btn>
            <v-btn 
              class="mx-1"
              color="primary"
              @click="isAddingTask = true">Add task</v-btn>
          </v-sheet>
        </v-sheet>
        <v-sheet class="bg-transparent d-flex flex-column justify-center align-center">
          <v-overlay 
            v-model="isAddingTask" 
            class="d-flex justify-center align-center">
            <TaskSettingsForm 
              @closeWindow="isAddingTask = false"
              @saveTask="saveTask()"
              :trip="trip"/>    
          </v-overlay>
          <EmptyPageWarning 
            v-if="trip.tasks.length === 0" 
            title="No tasks" 
            text="Add tasks"/>
          <TripTasks 
            :tripId="tripId"
            :needsUpdate="taskListUpdate"/>
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
import { ref, computed, onMounted, onErrorCaptured } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useTripStore } from "@/stores/TripStore"
import EmptyPageWarning from '@/components/EmptyPageWarning.vue';
import TaskSettingsForm from '@/components/TaskSettingsForm.vue';
import TextToTextField from '@/components/TextToTextField.vue';
import TripTasks from "@/components/TripTasks.vue";


//stores
const tripStore = useTripStore();

// router
const route = useRoute();
const router = useRouter();
// data
const isAddingTask = ref(false);
const tasksFilters = ref({})
const taskListUpdate = ref(false);

//methods
const saveTask = () => {
  console.log('saving');
  taskListUpdate.value = !taskListUpdate.value;
}

const applyFilterSettings = () => {
  tripStore.applyFilterSettings(tasksFilters.value);
}

const resetFilters = () => {
  tasksFilters.value = {
    date: {
      begin: '',
      end: '',
    },
    cost: 0,
  }
  console.log(tasksFilters.value);
  tripStore.resetFilters();
}

// computed
const taskAlerts = computed(() => {
  return {
    isOrderWrong: {
      value: !trip.value.isTasksInCorrectOrder,
      label: 'wrong order',
      type: 'error',
      showValue: false,
    },
    filterDateBegin: {
      value: tripStore.filterSettings.date.begin,
      label: 'start date',
      type: 'info',
      showValue: true,
      resetValue() {
        tasksFilters.value.date.begin = '';
        resetFilters();
      },
    },
    filterDateEnd: {
      value: tripStore.filterSettings.date.end,
      label: 'end date',
      type: 'info',
      showValue: true,
      resetValue() {
        tasksFilters.value.date.end = '';
        resetFilters();
      },
    },
    filterCost: {
      value: tripStore.filterSettings.cost,
      label: 'cost',
      type: 'info',
      showValue: true,
      resetValue() {
        tasksFilters.value.date.cost = 0;
        resetFilters();
      },
    },
  }
})

const tripId = computed(() => {
  return route.params.id;
})

const trip = computed(() => {
  return tripStore.trips.find((trip) => trip.id === tripId.value)
})

onErrorCaptured(async () => {
  alert('Wrong trip ID, redirecting...');
  const navigationResult = await router.push({name: 'dashboard'});
  if (navigationResult) {
    alert('error');
  }
  else {
    router.go();
  }
})

onMounted(() => {
  resetFilters();
})
</script>