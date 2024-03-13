<template>
  <v-sheet width="100%">
    <draggable 
      :list="trip.tasks" 
      tag="v-sheet"
      handle=".handle" 
      item-key="id">
      <template #item="{element: task}">
        <v-sheet>
          <v-hover>
            <template #default="{ isHovering, props }">
              <v-container>
                <v-row 
                  v-bind="props"
                  class="rounded cursor-pointer" 
                  :class="isHovering || task.isExpanded ? 'bg-grey-darken-3' : ''"
                  @click="task.isExpanded = !task.isExpanded">
                  <v-col 
                    class="d-flex justify-start align-center">
                    <VIcon 
                      class="handle cursor-grab" 
                      icon="mdi-menu"
                      variant="text"
                      :ripple="false"/>
                    <VDivider 
                      vertical 
                      class="mx-2"/>
                    <v-sheet 
                      width="100%" 
                      height="100%"
                      class="bg-transparent d-flex justify-start align-center text-h6">
                      {{task.title}}
                      <v-sheet 
                        v-if="!task.isSubtasksInCorrectOrder"
                        class="mx-2 text-caption text-error bg-transparent d-flex justify-center align-center">
                        <VIcon 
                          icon="mdi-alert-circle" 
                          class="mr-1"/>
                        Subtasks in wrong order
                      </v-sheet>
                    </v-sheet>
                    <v-sheet 
                      class="d-flex justify-end align-center text-overline bg-transparent" 
                      width="150px">
                      {{task.date}}
                      <VIcon 
                        icon="mdi-menu-down" 
                        class="ml-2"/>
                    </v-sheet>
                  </v-col> 
                </v-row>
								
              </v-container>
            </template>
          </v-hover>
          <draggable 
            v-if="task.subTasks && task.isExpanded"
            v-model="task.subTasks" 
            tag="v-container"
            handle=".handle" 
            item-key="id">
            <template #item="{element: subTask}">
              <v-row 
                v-bind="props"
                class="cursor-pointer px-10" 
                dense>
                <v-col class="d-flex justify-start align-center">
                  <VIcon 
                    class="handle cursor-grab" 
                    icon="mdi-menu"
                    rounded
                    :ripple="false"/>
                  <VDivider 
                    vertical 
                    class="mx-2"/>
                  <v-sheet 
                    width="100%" 
                    height="100%"
                    class="bg-transparent d-flex justify-start align-center">
                    <v-sheet>
                      <VTextField 
                        v-model="subTask.time" 
                        type="time"
                        density="compact"
                        variant="solo-filled"
                        hide-details
                        class="mr-2"/>
                    </v-sheet>
                    <div class="cursor-text">
                      <TextToTextField 
                        :text="subTask.title"
                        v-model="subTask.title"
                        replacable-text="title"/>

                    </div>
                  </v-sheet>
                </v-col> 
              </v-row>
            </template>
          </draggable>
          
        </v-sheet>
      </template>
    </draggable>
  </v-sheet>
</template>

<script setup>
import { computed, defineProps, onBeforeMount, onBeforeUpdate, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import TextToTextField from './TextToTextField.vue';
import { useTripStore } from '@/stores/TripStore';

const tripStore = useTripStore();

const props = defineProps({
  tripId: String,
  needsUpdate: Boolean
})


const trip = computed(() => {
  return tripStore.trips.find((trip) => trip.id === props.tripId)
})

const tripTasks = computed(() => {
  return trip.value.tasks;
})

const filteredTasks = computed(() => {
  return tripStore.filteredTasks(props.tripId)
})

// const draggableTasks = computed(() => {
//   return tripStore.draggableTasks(props.tripId)
// })

// const updateTasksSettings = () => {
//   tasksSettings.value = {};
//   filteredTasks.value.forEach((task, index) => {
//     tasksSettings.value[task.id] = {
//       isExpanded: false,
//       isTaskEdit: false,
//       day: index + 1
//     }
//   });
// }

// watch (() => props.needsUpdate, (newValue, oldValue) => {
//   console.log(newValue + ' --- ' + oldValue);
//   console.log('adflksjaghfjhklsdagfjshdafhjkdsahjfdsgahjkfgdsajkhfgsdajhgsdhajkfgjkhgfjsdagjhfgsdajhgfjshdkagfjkhsd')
// })

watch(() => props.needsUpdate, (first, second) => {
  console.log(
    "Watch props.selected function called with args:",
    first,
    second
  );
});

// onBeforeMount(() => {
//   updateTasksSettings();
// })
// onBeforeUpdate(() => {
//   updateTasksSettings();
// })
</script>