<template>
  <v-sheet 
    class="pa-4 d-flex flex-column"
    width="400px"
    rounded>
    <v-container>
      <v-row>
        <VTextField
          label="id"
          disabled
          v-model="taskInfo.id"/>
      </v-row>
      <v-row>
        <VTextField 
          label="Title" 
          v-model="taskInfo.title"/>
      </v-row>
      <v-row>
        <VTextField 
          label="Cost" 
          v-model="taskInfo.cost"
          type="number"
          :rules="[rules.isCostValid]"/>
      </v-row>
      <v-row>
        <VTextField 
          label="Date" 
          v-model="taskInfo.date"
          type="date"
          :rules="[rules.isDateValid]"/>
      </v-row>
    </v-container>
    
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
import { defineEmits, ref, onMounted, computed, defineProps } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useTripStore } from '@/stores/TripStore'

const emit = defineEmits(['closeWindow', 'saveTask'])

const props = defineProps({
  trip: Object,
  task: Object
})

const tripStore = useTripStore();

const taskInfo = ref({
  id: '',
  title: '',
  date: '',
  cost: 0,
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
  taskInfo.value.subtasks.push({
    id: uuidv4(),
    title: '',
    time: ''
  })
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