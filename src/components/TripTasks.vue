<template>
  <v-sheet width="100%">
    <draggable 
      :list="trip.tasks" 
      @end="saveAfterMoving()"
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
                  @click="!isEditingTasks ? toggleExpansion(task) : emitEditingTask(task)">
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
                        v-if="!tripStore.isSubtasksInCorrectOrder(task.subTasks)"
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
                        :icon="task.isExpanded ? 'mdi-menu-up' : 'mdi-menu-down'" 
                        size="30"
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
            item-key="id"
            @end="saveAfterMoving()">
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
          <VDivider/>
        </v-sheet>
      </template>
    </draggable>
  </v-sheet>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import draggable from 'vuedraggable';
import TextToTextField from './TextToTextField.vue';
import { useTripStore } from '@/stores/TripStore';

const tripStore = useTripStore();

const props = defineProps({
  tripId: String,
  isEditingTasks: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['updateTask'])

const toggleExpansion = (task) => {
  task.isExpanded = !task.isExpanded
}

const emitEditingTask = (task) => {
  console.log('emitting')
  emit('updateTask', task)
}

const trip = computed(() => {
  return tripStore.trips.find((trip) => trip.id === props.tripId)
})

const saveAfterMoving = () => {
  tripStore.saveToLocalStorage();  
}
</script>