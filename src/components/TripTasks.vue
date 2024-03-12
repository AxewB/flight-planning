<template>
  <v-sheet width="100%">
    <draggable 
      :list="props.tasks" 
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
                  :class="isHovering ? 'bg-grey-darken-3' : ''"
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
                      width="100%" 
                      height="100%"
                      class="bg-transparent d-flex justify-start align-center text-h6">
                      {{task.title}} 
                    </v-sheet>
                  </v-col> 
                  <v-col class="d-flex justify-end align-center text-overline">
                    {{task.date}}
                    <VIcon 
                      icon="mdi-menu-down" 
                      class="ml-2"/>
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
	tasks: Object,
})
const tasksSettings = ref({});
const getCertainTask = (id) => {
  return props.tasks.find(task => task.id === id)
}

const updateTasksSettings = () => {
  tasksSettings.value = {};
  props.tasks.forEach(task => {
    tasksSettings.value[task.id] = {
      isExpanded: false,
      isTaskEdit: false,
    }
  });
}
onBeforeMount(() => {
  updateTasksSettings();
})
onBeforeUpdate(() => {
  updateTasksSettings();
})
</script>