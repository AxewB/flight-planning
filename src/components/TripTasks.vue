<template>
  <v-sheet width="100%">
    <draggable 
      :list="props.trip.tasks" 
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
                  :class="isHovering || tasksSettings[task.id].isExpanded ? 'bg-grey-darken-3' : ''"
                  @click="tasksSettings[task.id].isExpanded = !tasksSettings[task.id].isExpanded">
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
                      class="text-overline d-flex align-center justify-center bg-transparent" 
                      width="60px">
                      DAY {{ tasksSettings[task.id].day }}
                    </v-sheet>
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
            v-if="task.subTasks && tasksSettings[task.id].isExpanded"
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
import { computed, defineProps, onBeforeMount, onBeforeUpdate, ref } from 'vue';
import draggable from 'vuedraggable';
import TextToTextField from './TextToTextField.vue';

const props = defineProps({
  trip: Object,
})
const tasksSettings = ref({});
const getCertainTask = (id) => {
  return props.tasks.find(task => task.id === id)
}

const updateTasksSettings = () => {
  tasksSettings.value = {};
  props.trip.tasks.forEach((task, index) => {
    tasksSettings.value[task.id] = {
      isExpanded: false,
      isTaskEdit: false,
      day: index + 1
    }
  });
}

const errorsList = computed(() => {
  if (!props.trip.isTasksInCorrectOrder) {
    return 'Tasks in wrong order!';
  }
  return ''
}) 

onBeforeMount(() => {
  updateTasksSettings();
})
onBeforeUpdate(() => {
  updateTasksSettings();
})
</script>