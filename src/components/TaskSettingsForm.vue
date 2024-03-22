<template>
  <v-sheet 
    class="pa-4 d-flex flex-column"
    width="600px"
    rounded>
    <v-container>
      <v-row>
        <VTextField
          prepend-icon="mdi-key"
          label="id"
          disabled
          v-model="taskInfo.id"/>
      </v-row>
      <v-row>
        <VTextField 
          prepend-icon="mdi-text"
          label="Title" 
          v-model="taskInfo.title"/>
      </v-row>
      <v-row>
        <VTextField 
          prepend-icon="mdi-currency-usd"
          label="Cost" 
          v-model="taskInfo.cost"
          type="number"
          :rules="[rules.isCostValid]"/>
      </v-row>
      <v-row>
        <VTextField 
          prepend-icon="mdi-calendar"
          label="Date" 
          v-model="taskInfo.date"
          type="date"
          :rules="[rules.isDateValid]"/>
      </v-row>
      <v-row>
        <v-autocomplete 
          variant="solo-filled" 
          label="Place"
          clearable
          :items="placeStore.places"
          item-title="name"
          v-model="taskInfo.place"
          prepend-icon="mdi-map-marker"></v-autocomplete> 
      </v-row>
    </v-container>
    <VDivider/>
    <v-sheet 
      width="100%" 
      
      class="pa-2">
      
      <v-sheet
        v-if="taskInfo.subTasks.length === 0">
        <EmptyPageWarning 
          title="There is no subtasks"
          description="Add subtasks to this task is needed">
          <template #actions>
            <v-btn
              @click="addSubtask()">Add subtask</v-btn>
          </template>
        </EmptyPageWarning>
      </v-sheet>
      <v-sheet 
        v-else
        class="overflow-y-auto my-2" 
        max-height="200px">
        <v-sheet class="d-flex justify-end align-center">
          <v-btn 
            color="primary"
            @click="addSubtask()">
            Add subtask
          </v-btn>
        </v-sheet>
        <v-sheet 
          v-for="subtask in taskInfo.subTasks" 
          :key="subtask.id"
          class="d-flex my-2">
          <v-sheet class="flex-grow-1 px-2">
            <VTextField 
              density="compact"
              hide-details
              variant="solo-filled"
              label="Title" 
              v-model="subtask.title"/>
          </v-sheet>
          <v-sheet class="px-2">
            <VTextField 
              density="compact"
              hide-details
              variant="solo-filled"
              label="Time" 
              v-model="subtask.time"
              type="time"/>
          </v-sheet>
          <v-sheet class="px-2">
            <v-sheet>
              <v-btn
                icon
                size="small"
                @click="removeSubtask(subtask)">
                <VIcon icon="mdi-trash-can"/>
              </v-btn>
            </v-sheet>
          </v-sheet>
        </v-sheet>

      </v-sheet>
      
    </v-sheet>
    <v-sheet 
      width="100%"
      class="d-flex justify-end">
      <v-btn 
        @click="closeWindow"
        variant="text">Cancel</v-btn>
      <v-btn 
        @click="saveTask()"
        color="primary">Save</v-btn>
    </v-sheet>
    
  </v-sheet>
</template>

<script setup>
import { defineEmits, ref, onMounted, defineProps } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useTripStore } from '@/stores/TripStore'
import { usePlaceStore } from '@/stores/PlaceStore'
import EmptyPageWarning from './EmptyPageWarning.vue';

const emit = defineEmits(['closeWindow', 'saveTask'])

const props = defineProps({
  trip: Object,
  task: Object
})

const tripStore = useTripStore();
const placeStore = usePlaceStore();

const taskInfo = ref({
  id: '',
  title: '',
  date: '',
  cost: 0,
  place: null,
  subTasks: [] 
})

const rules = ref({
  isDateValid: value => {
    const beginDate = new Date(props.trip.date.begin).getTime();
    const endDate = new Date(props.trip.date.end).getTime();
    const currentDate = new Date(value).getTime();
    return beginDate <= currentDate && currentDate <= endDate || 'Invalid date';
  },
  isCostValid: value => value >= 0 || 'Invalid cost',
})

const saveTask = () => {
  if (props.task) {
    tripStore.updateTaskInTrip(props.task, taskInfo.value);
  }
  else {
    tripStore.addTaskToTrip(props.trip, taskInfo.value);  
  }
  emit('closeWindow');
  emit('saveTask');
}
const closeWindow = () => {
  emit('closeWindow');
}

const addSubtask = () => {
  taskInfo.value.subTasks.push({
    id: uuidv4(),
    title: '',
    time: ''
  })
}

const removeSubtask = (subTask) => {
  taskInfo.value.subTasks.filter((task) => task.id !== subTask.id);
}

onMounted(() => {
  if (props.task) {
    taskInfo.value = props.task;
  }
  else {
    taskInfo.value.id = uuidv4();
  }
})
</script>