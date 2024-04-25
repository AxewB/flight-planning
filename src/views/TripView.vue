<template>
  <v-sheet 
    class="bg-transparent 
          d-flex 
          flex-column 
          pa-5"
  >
    <TripHeader 
      :trip-id="tripId"
      @update:save-trip="saveTrip()"/>
    <VDivider class="my-4"/>
    <v-sheet class="d-flex flex-column">
      <v-container>
        <v-row>
          <v-col>
            <VTextField 
              variant="solo-filled" 
              label="Начало"
              type="date"
              hide-details
              v-model="trip.date.begin"
              @update:model-value="saveTrip()"
              prepend-icon="mdi-calendar"
            />
          </v-col>
          <v-col >
            <VTextField 
              variant="solo-filled" 
              label="Конец"
              type="date"
              hide-details
              v-model="trip.date.end"
              @update:model-value="saveTrip()"
              prepend-icon="mdi-calendar"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col >
            <VTextField 
              variant="solo-filled" 
              label="Бюджет"
              hide-details
              v-model="trip.budget"
              prefix="$"
              type="number"
              hide-spin-buttons
              @update:model-value="saveTrip()"
              prepend-icon="mdi-cash"
            />
          </v-col>
          <v-col >
            <VAutocomplete 
              variant="solo-filled" 
              label="Место"
              clearable
              :items="placeStore.places"
              item-title="name"
              v-model="trip.place"
              @update:model-value="saveTrip()"
              prepend-icon="mdi-map-marker"
            />    
          </v-col>
          <v-col>
            <VSelect 
              variant="solo-filled" 
              label="Друзья"
              clearable
              type="number"
              hide-details
              prepend-icon="mdi-account-group"
              @update:model-value="saveTrip()"
              :items="friendStore.friends" 
              item-title="firstName" 
              multiple
              chips
              v-model="trip.friends"
            >
              <template #item="{ props, item }">
                <v-list-item 
                  v-bind="props" 
                  :subtitle="item.raw.department"
                >
                  <template #prepend>
                    <VAvatar
                      size="30" 
                      :image = "item.raw.avatar.image"
                    />
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
      width="100%"
    >
      <v-sheet class="flex-grow-1">
        <v-sheet 
          class="bg-transparent 
                text-h4 
                mb-2 
                d-flex
                justify-start 
                align-center"
        >
          План поездки

          <v-sheet 
            class="bg-transparent 
                  d-flex 
                  justify-end 
                  align-center 
                  flex-grow-1"
          >
            <v-btn 
              class="mx-1"
              icon
              size="small"
              rounded
              variant="text"
            >
              <VIcon icon="mdi-filter-menu"/>
              <v-menu 
                activator="parent"
                :close-on-content-click="false"
              >
                <v-sheet>
                  <v-container>
                    <v-row>
                      <v-col 
                        cols="1" 
                        class="d-flex 
                              justify-center 
                              align-center"
                      >
                        <VIcon icon="mdi-calendar"/>  
                      </v-col>
                      <v-col>
                        <VTextField 
                          variant="solo-filled" 
                          label="Начало"
                          type="date"
                          hide-details
                          density="compact"
                          clearale
                          @update:model-value="saveTrip()"
                          v-model="tasksFilters.date.begin"
                        />
                      </v-col>
                      <v-col>
                        <VTextField 
                          variant="solo-filled" 
                          label="Конец"
                          type="date"
                          density="compact"
                          hide-details
                          @update:model-value="saveTrip()"
                          v-model="tasksFilters.date.end"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col 
                        cols="1" 
                        class="d-flex 
                              justify-center 
                              align-center"
                      >
                        <VIcon icon="mdi-cash"/>  
                      </v-col>
                      <v-col>
                        <v-text-field 
                          variant="solo-filled" 
                          label="Стоимость"
                          type="number"
                          hide-details
                          hide-spin-buttons
                          density="compact"
                          clearable
                          @update:focused="saveTrip()"
                          v-model="tasksFilters.cost"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="d-flex justify-end">
                        <v-btn 
                          @click="tripStore.resetFilters()"
                          color="warning"
                          variant="tonal"
                        >
                          Сбросить
                        </v-btn>
                        <v-btn 
                          @click="applyFilterSettings()" 
                          color="primary"
                          class="ml-2"
                        >
                          Применить
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-sheet>
              </v-menu>
              <VTooltip 
                location="top"
                text="Фильтры"
                activator="parent"
              />
            </v-btn>
            <v-btn 
              class="mx-1"
              icon
              size="small"
              rounded
              variant="text"
              @click="isTasksEditing = !isTasksEditing"
              :color="isTasksEditing ? 'primary' : ''"
            >
              <VIcon icon="mdi-pencil"/>
              <VTooltip 
                location="top"
                text="Редактировать"
                activator="parent"
              />
            </v-btn>
            <v-btn 
              class="mx-1"
              color="primary"
              @click="isAddingTask = true"
            >
              Добавить задание
            </v-btn>
          </v-sheet>
        </v-sheet>
        <v-sheet 
          class="mb-2
                text-caption 
                text-error 
                bg-transparent 
                d-flex 
                justify-start 
                align-center
                overflow-x-auto"
        >
          <v-sheet 
            v-for="(alert, alertName) in taskAlerts" 
            :key="alertName"
          >
            <v-chip 
              v-if="alert.value"
              :color="alert.type"
              size="small"
              class="mx-1"
              :closable="alert.type !== 'error'"
              @click:close="alert.resetValue()"
            >
              {{ alert.label}}{{ alert.showValue ? ` ${alert.value}` : '' }}
            </v-chip>
          </v-sheet>
        </v-sheet>
        <v-sheet 
          class="bg-transparent 
                d-flex 
                flex-column 
                justify-center 
                align-center"
        >
          <v-overlay 
            v-model="isAddingTask" 
            class="d-flex 
                  justify-center 
                  align-center"
          >
            <TaskSettingsForm 
              @close-window="closeTaskWindow()"
              @save-task="saveTask()"
              :trip="trip"
              :task="taskToUpdate"
            />    
          </v-overlay>
          <EmptyPageWarning 
            v-if="!trip.tasks.length" 
            title="No tasks" 
            text="Add tasks"
          />
          <TripTasks 
            :tripId="tripId"
            :isEditingTasks="isTasksEditing"
            @update-task="updateTask"
          />
        </v-sheet>
      </v-sheet>
      <VDivider 
        vertical 
        class="mx-2"
      />
      <v-sheet 
        class="d-flex flex-column"
        min-width="300px"
      >
        <v-sheet>
          <VTextarea 
            label="Заметки" 
            variant="solo-filled" 
            prepend-inner-icon="mdi-comment"
            rows="10"
            v-model="trip.notes"
          />
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useTripStore } from "@/stores/TripStore"
import { usePlaceStore } from "@/stores/PlaceStore"
import { useFriendStore } from '@/stores/FriendStore';
import EmptyPageWarning from '@/components/EmptyPageWarning.vue';
import TaskSettingsForm from '@/components/trip/TaskSettingsForm.vue';
import TripTasks from "@/components/trip/TripTasks.vue";
import TripHeader from '@/components/trip/TripHeader.vue';

//stores
const tripStore = useTripStore();
const placeStore = usePlaceStore();
const friendStore = useFriendStore();

// router
const route = useRoute();

// data
const isAddingTask = ref(false);
const tasksFilters = ref({
  date: {
    begin: '',
    end: '',
  },
  cost: 0,
})
const isTasksEditing = ref(false);
const taskToUpdate = ref(null);

//methods
const saveTask = () => {
  isAddingTask.value = false;
}

const applyFilterSettings = () => {
  tripStore.applyFilterSettings(tasksFilters.value);
}

// computed
const taskAlerts = computed(() => {
  return {
    isOrderWrong: {
      value: !tripStore.isTasksInCorrectOrder(trip.value.tasks),
      label: 'План в неправильном порядке',
      type: 'error',
      showValue: false,
    },
    filterDateBegin: {
      value: tripStore.filterSettings.date.begin,
      label: 'Начало',
      type: 'info',
      showValue: true,
      resetValue() {
        tasksFilters.value.date.begin = '';
      },
    },
    filterDateEnd: {
      value: tripStore.filterSettings.date.end,
      label: 'Конец',
      type: 'info',
      showValue: true,
      resetValue() {
        tasksFilters.value.date.end = '';
      },
    },
    filterCost: {
      value: tripStore.filterSettings.cost,
      label: 'Стоимость > ',
      type: 'info',
      showValue: true,
      resetValue() {
        tasksFilters.value.date.cost = 0;
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
    tripStore.saveToLocalStorage();
    clearInterval(interval);
  }, 500);
}
</script>