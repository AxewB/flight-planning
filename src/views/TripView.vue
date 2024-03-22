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
      <v-sheet 
        class="bg-transparent 
              flex-grow-1 
              d-flex 
              flex-column">
        <v-sheet 
          class="bg-transparent 
                d-flex 
                justify-space-between">
          <TextToTextField 
            :text="trip.title"
            v-model="trip.title"
            replacable-text="title"
            class="text-h3 mb-4"
            @update:modelValue="saveTrip()"/>
          <v-sheet min-width="300px">
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
                  <VColorPicker 
                    v-model="trip.avatar.color"
                    @update:modelValue="saveTrip()"/>
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
                  class="pa-4 
                        border 
                        d-flex 
                        flex-column 
                        justify-center 
                        align-center" 
                  width="400px">
                  <v-sheet class="mb-4">Изменить изображение поездки</v-sheet>
                  <v-sheet 
                    class="d-flex" 
                    width=100%>
                    <VTextField
                      class="mx-2" 
                      density="compact"
                      hide-details
                      v-model="trip.avatar.image"
                      @update:modelValue="saveTrip()"
                      label="Image url"/>
                    <v-btn 
                      icon
                      @click="tripStore.removeTripImage(tripId)">
                      <VIcon 
                        icon="mdi-trash-can"
                        color="error"
                        variant="text"/>
                      <VTooltip 
                        activator="parent" 
                        text="Remove image"
                        location="bottom"/>
                    </v-btn>
                  </v-sheet>
                </v-sheet>
              </v-menu>
            </v-btn>
            <v-btn 
              icon
              elevation="0">
              <VIcon icon="mdi-trash-can"/>
              <ConfirmationMenu 
                message="Удалить эту поездку?"
                @OK="removeTrip(tripId)"/>
            </v-btn>
            <v-btn 
              icon
              elevation="0">
              <VIcon icon="mdi-content-copy"/>
              <ConfirmationMenu 
                message="Копировать эту поездку?"
                @OK="copyTrip()"/>
            </v-btn>
          </v-sheet>
        </v-sheet>
        <v-sheet>
          <TextToTextField 
            :text="trip.description"
            v-model="trip.description"
            replacable-text="Описание"
            @update:modelValue="saveTrip()"/>
          <v-sheet class="flex-grow-1"></v-sheet>
        </v-sheet>
        
      </v-sheet>
      <v-sheet 
        class="bg-transparent 
              d-flex 
              flex-column 
              fill-height">
      </v-sheet>
    </v-sheet>
    <VDivider class="my-4"/>
    <v-sheet class="d-flex flex-column">
      <v-container>
        <v-row>
          <v-col>
            <VTextField 
              variant="solo-filled" 
              label="begin date"
              type="date"
              hide-details
              v-model="trip.date.begin"
              @update:modelValue="saveTrip()"
              prepend-icon="mdi-calendar"/>
          </v-col>
          <v-col >
            <VTextField 
              variant="solo-filled" 
              label="end date"
              type="date"
              hide-details
              v-model="trip.date.end"
              @update:modelValue="saveTrip()"
              prepend-icon="mdi-calendar"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col >
            <VTextField 
              variant="solo-filled" 
              label="budget"
              hide-details
              v-model="trip.budget"
              prefix="$"
              type="number"
              hide-spin-buttons
              @update:modelValue="saveTrip()"
              prepend-icon="mdi-cash"/>
          </v-col>
          <v-col >
            <VAutocomplete 
              variant="solo-filled" 
              label="Place"
              clearable
              :items="placeStore.places"
              item-title="name"
              v-model="trip.place"
              @update:modelValue="saveTrip()"
              prepend-icon="mdi-map-marker"/>    
          </v-col>
          <v-col>
            <VSelect 
              variant="solo-filled" 
              label="Friends"
              clearable
              type="number"
              hide-details
              prepend-icon="mdi-account-group"
              @update:modelValue="saveTrip()"
              :items="friendStore.friends" 
              item-title="firstName" 
              multiple
              chips
              v-model="trip.friends">
              <template v-slot:item="{ props, item }">
                <v-list-item 
                  v-bind="props" 
                  :subtitle="item.raw.department">
                  <template #prepend>
                    <VAvatar
                      size="30" 
                      :image = "item.raw.avatar.image"/>
                  </template>
                </v-list-item>
              </template>
            </VSelect>  
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
          План поездки
          
          <v-sheet 
            class="mx-2 
                  text-caption 
                  text-error 
                  bg-transparent 
                  d-flex 
                  justify-start 
                  align-center">
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
          <v-sheet 
            class="bg-transparent 
                  d-flex 
                  justify-end 
                  align-center 
                  flex-grow-1">
            <v-btn 
              class="mx-1"
              icon
              size="small"
              rounded
              variant="text">
              <VIcon icon="mdi-filter-menu"/>
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
                        <VTextField 
                          variant="solo-filled" 
                          label="begin date"
                          type="date"
                          hide-details
                          density="compact"
                          clearale
                          @update:modelValue="saveTrip()"
                          v-model="tasksFilters.date.begin"/>
                      </v-col>
                      <v-col>
                        <VTextField 
                          variant="solo-filled" 
                          label="end date"
                          type="date"
                          density="compact"
                          hide-details
                          @update:modelValue="saveTrip()"
                          v-model="tasksFilters.date.end"/>
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
                          @update:focused="saveTrip()"
                          v-model="tasksFilters.cost"/>
                      </v-col>
                      
                    </v-row>
                    <v-row>
                      <v-col class="d-flex justify-end">
                        <v-btn 
                          @click="resetFilters()"
                          color="warning"
                          variant="tonal">
                          Сбросить
                        </v-btn>
                        <v-btn 
                          @click="applyFilterSettings()" 
                          color="primary"
                          class="ml-2">Применить</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-sheet>
                
              </v-menu>
              <VTooltip 
                location="top"
                text="Filter tasks"
                activator="parent"/>
            </v-btn>
            <v-btn 
              class="mx-1"
              icon
              size="small"
              rounded
              variant="text"
              @click="isTasksEditing = !isTasksEditing"
              :color="isTasksEditing ? 'primary' : ''">
              <VIcon 
                icon="mdi-pencil"/>
              <VTooltip 
                location="top"
                text="Edit tasks"
                activator="parent"/>
            </v-btn>
            <v-btn 
              class="mx-1"
              color="primary"
              @click="isAddingTask = true">
              Добавить задание</v-btn>
          </v-sheet>
        </v-sheet>
        <v-sheet class="bg-transparent d-flex flex-column justify-center align-center">
          <v-overlay 
            v-model="isAddingTask" 
            class="d-flex justify-center align-center">
            <TaskSettingsForm 
              @closeWindow="closeTaskWindow()"
              @saveTask="saveTask()"
              :trip="trip"
              :task="taskToUpdate"/>    
          </v-overlay>
          <EmptyPageWarning 
            v-if="trip.tasks.length === 0" 
            title="No tasks" 
            text="Add tasks"/>
          <TripTasks 
            :tripId="tripId"
            :isEditingTasks="isTasksEditing"
            @updateTask="updateTask"/>
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useTripStore } from "@/stores/TripStore"
import { usePlaceStore } from "@/stores/PlaceStore"
import { useFriendStore } from '@/stores/FriendStore';
import EmptyPageWarning from '@/components/EmptyPageWarning.vue';
import TaskSettingsForm from '@/components/TaskSettingsForm.vue';
import TextToTextField from '@/components/TextToTextField.vue';
import TripTasks from "@/components/TripTasks.vue";
import ConfirmationMenu from "@/components/ConfirmationMenu.vue"

//stores
const tripStore = useTripStore();
const placeStore = usePlaceStore();
const friendStore = useFriendStore();

// router
const route = useRoute();
const router = useRouter();

// data
const isAddingTask = ref(false);
const tasksFilters = ref({})
const isTasksEditing = ref(false);
const taskToUpdate = ref(null);

//methods
const saveTask = () => {
  isAddingTask.value = false;
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
  tripStore.resetFilters();
}

// computed
const taskAlerts = computed(() => {
  return {
    isOrderWrong: {
      value: !tripStore.isTasksInCorrectOrder(trip.value.tasks),
      label: 'tasks in wrong order',
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
  const currentTrip = tripStore.trips.find((trip) => trip.id === tripId.value)
  return currentTrip ? currentTrip : {}
})

const removeTrip = async () => {
  const id = tripId.value;
  const navigationResult = await router.push({name: 'dashboard'});
  if (!navigationResult){
    tripStore.removeTrip(id);
  }
}

const copyTrip = () => {
  const cpId = tripStore.copyTrip(trip.value);
  router.push({name: 'trip', params: {id: cpId}});
}

const updateTask = (task) => {
  taskToUpdate.value = task;
  isAddingTask.value = true;
}

const closeTaskWindow = () =>{
  isAddingTask.value = false;
  taskToUpdate.value = null;
}

let interval = null;
function saveTrip() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    console.info('Trip was saved!');
    tripStore.saveToLocalStorage();
    clearInterval(interval);
  }, 500);
}

// lifecycle
onMounted(() => {
  resetFilters();
})
</script>