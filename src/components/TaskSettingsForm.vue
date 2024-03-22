<template>
  <v-sheet 
    class="pa-4 d-flex flex-column"
    width="600px"
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
    <VDivider/>
    <v-sheet 
      width="100%" 
      max-height="200px"
      class="pa-2">
      <v-sheet class="d-flex justify-end align-center">
        <v-btn 
          color="primary"
          @click="addSubtask()">
          Add subtask
        </v-btn>
      </v-sheet>
      <draggable
        v-model="taskInfo.subTasks"
        tag="v-sheet"
        handle=".handle"
        item-key="id">
        <template #item="{element: subTask}">
          <v-sheet>
            <VIcon 
              icon="mdi-menu"
              class="handle"/>
            <VTextField 
              density="compact"
              variant="solo-filled"
              label="Title" 
              v-model="subTask.title"/>
          </v-sheet>
        </template>
      </draggable>
      <v-container>

        <v-row 
          v-for="subtask in taskInfo.subTasks" 
          :key="subtask.id">
          <v-col>
            <VTextField 
              density="compact"
              hide-details
              variant="solo-filled"
              label="Title" 
              v-model="subtask.title"/>
          </v-col>
          <v-col>
            <VTextField 
              density="compact"
              hide-details
              variant="solo-filled"
              label="Time" 
              v-model="subtask.time"
              type="time"/>
          </v-col>
          <v-col cols="1">
            <v-btn
              icon
              size="small"
              @click="removeSubtask(subtask)">
              <VIcon icon="mdi-trash-can"/>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

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
import { defineEmits, ref, onMounted, computed, defineProps } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useTripStore } from '@/stores/TripStore'
import { draggable } from 'vuedraggable'

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
  taskInfo.value.subTasks.push({
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