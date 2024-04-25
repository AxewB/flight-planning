<template>
  <v-sheet width="100%">
    <draggable 
      :list="tripStore.isTasksFiltered ? tripStore.filteredTasks(trip.id) : trip.tasks" 
      @end="saveAfterMoving"
      tag="v-sheet"
      handle=".handle" 
      item-key="id"
    >
      <template #item="{element: task}">
        <v-sheet>
          <v-hover>
            <template #default="{ isHovering, props }">
              <v-container>
                <v-row 
                  v-bind="props"
                  class="rounded cursor-pointer" 
                  :class="isHovering || task.isExpanded ? 'bg-grey-darken-3' : ''"
                  @click="!isEditingTasks ? toggleExpansion(task) : emitEditingTask(task)"
                >
                  <v-col 
                    class="d-flex 
                          justify-start 
                          align-center"
                  >
                    <VIcon 
                      class="handle cursor-grab" 
                      icon="mdi-drag"
                      variant="text"
                      size="large"
                      :ripple="false"
                    />
                    
                    <VDivider 
                      vertical 
                      class="mx-2"
                    />

                    <v-sheet
                      width="100%" 
                      height="100%"
                      class="bg-transparent
                            d-flex 
                            flex-column 
                            justify-start" 
                    >
                      <v-sheet 
                        class="bg-transparent 
                              d-flex 
                              justify-start 
                              align-center 
                              text-h6"
                      >
                        {{ task.title }}
                      </v-sheet>
                      <v-sheet 
                        v-if="!tripStore.isSubtasksInCorrectOrder(task.subTasks)"
                        class="text-caption 
                              text-error 
                              bg-transparent 
                              d-flex 
                              align-center"
                      >
                        <VIcon 
                          icon="mdi-alert-circle" 
                          class="mr-1"
                        />
                        Подзадачи в неправильном порядке
                      </v-sheet>  
                    </v-sheet>
                    <v-sheet 
                      class="d-flex 
                            justify-end 
                            align-center 
                            text-overline 
                            bg-transparent"
                      min-width="400px"
                    >
                      <v-sheet 
                        v-if="task.place"
                        class="bg-transparent"
                      >
                        
                        {{ shortText(task.place, 15) }}
                      </v-sheet>
                      <VDivider 
                        v-if="task.place"
                        vertical 
                        class="mx-4"
                      />
                      <v-sheet class="bg-transparent">
                        {{task.cost}}₽
                      </v-sheet>
                      <VDivider 
                        vertical 
                        class="mx-4"
                      />
                      <v-sheet class="bg-transparent">
                        {{task.date}}
                      </v-sheet>
                      <VIcon 
                        :icon="!task.subTasks.length ? '' :task.isExpanded ? 'mdi-menu-up' : 'mdi-menu-down'" 
                        size="30"
                        class="ml-2"
                      />
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
            @end="saveAfterMoving"
          >
            <template #item="{element: subTask}">
              <v-row 
                v-bind="props"
                class="cursor-pointer px-10" 
                dense
              >
                <v-col 
                  class="d-flex 
                        justify-start 
                        align-center"
                >
                  <VIcon 
                    class="handle cursor-grab" 
                    icon="mdi-menu"
                    rounded
                    :ripple="false"
                  />
                  <VDivider 
                    vertical 
                    class="mx-2"
                  />
                  <v-sheet 
                    width="100%" 
                    height="100%"
                    class="bg-transparent 
                          d-flex 
                          justify-start 
                          align-center"
                  >
                    <v-sheet>
                      <VTextField 
                        v-model="subTask.time" 
                        type="time"
                        density="compact"
                        variant="solo-filled"
                        hide-details
                        class="mr-2"
                      />
                    </v-sheet>
                    <div class="cursor-text">
                      <TextToTextField 
                        :text="subTask.title"
                        v-model="subTask.title"
                        replacable-text="title"
                      />
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

    <v-snackbar 
      v-model="isSnackBarShow"
      :timeout="5000"
    >
      Сбросьте фильтры, чтобы изменять положение задач
      <template #actions>
        <v-btn
          color="error"
          variant="text"
          @click="resetFilters"
        >
          Сбросить
        </v-btn>
        <v-btn
          color="error"
          variant="text"
          @click="isSnackBarShow = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue';
import draggable from 'vuedraggable';
import TextToTextField from '@/components/TextToTextField.vue';
import { useTripStore } from '@/stores/TripStore';

// stores
const tripStore = useTripStore();

// props
const props = defineProps({
  tripId: {
    type: String
  },
  isEditingTasks: {
    type: Boolean,
    default: false
  }
})

// data
const isSnackBarShow = ref(false);

// emits
const emit = defineEmits(['updateTask'])

// computed
const trip = computed(() => {
  return tripStore.trips.find((trip) => trip.id === props.tripId)
})

const shortText = computed(() => {
  return (text, length = 10) => {
    if (!text) {
      return ''
    }

    if (text.length > length)
      return text.slice(0, length) + '...'
    else
      return text
  }
})

// methods 
const toggleExpansion = (task) => {
  if (task.subTasks.length > 0)
    task.isExpanded = !task.isExpanded
}

const emitEditingTask = (task) => {
  emit('updateTask', task)
}

const resetFilters = () => {
  tripStore.resetFilters();
  isSnackBarShow.value = false
}

const saveAfterMoving = () => {
  if (tripStore.isTasksFiltered) {
    isSnackBarShow.value = true
  }
  else
    tripStore.saveToLocalStorage();  
}
</script>