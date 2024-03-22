import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';
import tripExample from '../example/tripExample.json'
export const useTripStore = defineStore('trip', {
  state: () => ({
    filterSettings: {
      date: {
        begin: '',
        end: '',
      },
      cost: 0,
    },
    trips: []
  }),
  getters: {
    tripPattern() {
      return {
        id: uuidv4(), 
        title: 'title', 
        avatar: {
          color: "grey",
          image: '',
        },
        budget: 0,
        status: 'planned', 
        date: {
          begin: '1970-01-01', 
          end: '1970-01-01'
        },
        description: 'description',
        tasks: [
          {
            id: uuidv4(),
            title: "task",
            date: '1970-01-01',
            cost: 0,
            subTasks: [
              {
                id: uuidv4(),
                title: "subtask",
                time: '00:00',
              },
            ],
          },
        ],
        notes: '',
        draggableSettings: {
          isExpanded: false,
          isTaskEdit: false,
        },
      }
    },
    filteredTasks: (state) => {
      const begin_date = state.filterSettings.date.begin ? new Date(state.filterSettings.date.begin) : 0;
      const end_date = state.filterSettings.date.end ? new Date(state.filterSettings.date.end) : 999999999;
      return (id) => {
        const trip = state.trips.find((trip) => trip.id === id)
        let trip_tasks = trip.tasks.filter((task) => task.cost > state.filterSettings.cost);

        if (state.filterSettings.date.begin) 
          trip_tasks = trip_tasks.filter((task) => new Date(task.date) >= begin_date);
        if (state.filterSettings.date.end)
          trip_tasks = trip_tasks.filter((task) => new Date(task.date) <= end_date);
        return trip_tasks
      }
    },
    isTasksInCorrectOrder: () => {
      return (tasks) => {
        if (tasks) {
          return tasks.every((v, i, a) => !i || a[i-1].date <= v.date)
        }
        else {
          return true
        }
      }
    },
    isSubtasksInCorrectOrder: () => {
      return (subtasks) => {
        if (subtasks) {
          return subtasks.every((v, i, a) => !i || a[i-1].time <= v.time)
        }
        else {
          return true
        }
      }
    },
    sortTripsByDate(state) {
      if (!state.trips) 
        return null;
      else
        return state.trips.sort((a, b) => new Date(a.date.begin) - new Date(b.date.begin))
    },
    closestTrip(state) {
      if (!state.trips) 
        return null;
      else
        return state.sortTripsByDate[0];
    },
    tripPlaces(state) {
      if (!state.trips) 
        return null;

      const result = [];
      state.trips.forEach((trip) => {
        if (trip.place) {
          result.push(trip.place)
        }
      })
      return result
    }
  },
  actions: {
    addTrip() {
      if (!this.trips) {
        this.trips = [];
      }
      this.trips.push({
        id: uuidv4(), 
        name: '', 
        avatar: {
          color: "grey",
          image: '',
        },
        budget: 0,
        isDone: false, 
        date: {
          begin: '', 
          end: ''
        },
        description: '',
        tasks: [],
        notes: '',
        tags: [],
      });
      this.saveToLocalStorage();
    },
    removeTrip(id) {
      this.trips = this.trips.filter((trip) => trip.id !== id);
      this.saveToLocalStorage();
    },
    copyTrip(trip) {
      const newTrip = { ...trip };
      newTrip.id = uuidv4();
      newTrip.title = `Copy of ${trip.title}`
      this.trips.push(newTrip);
      this.saveToLocalStorage();
    },
    removeTripImage(id) {;
      this.trips.find(trip => trip.id === id).avatar.image = null;
      this.saveToLocalStorage();
    },
    addTaskToTrip(trip, task) {
      trip.tasks.push(task);
      this.saveToLocalStorage();
    },
    updateTaskInTrip(task, newTask) {
      task = newTask;
      this.saveToLocalStorage();
    },
    removeTaskFromTrip(trip, taskId) {
      trip.tasks = trip.tasks.filter((task) => task.id !== taskId);
      this.saveToLocalStorage();
    },
    resetFilters() {
      this.filterSettings = {
        date: {
          begin: '',
          end: '',
        },
        cost: 0,
      }
    },
    applyFilterSettings(settings) {
      const {date, cost} = settings;
      this.filterSettings = {
        date,
        cost,
      }
    },
    loadExample() {
      this.trips = [...tripExample.trips];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('trips', JSON.stringify(this.trips))
    },
    loadFromLocalStorage() {
      const trips = JSON.parse(localStorage.getItem('trips'));
      if (trips) {
        this.trips = trips
      }
    },
    resetStore() {
      this.trips = []
      localStorage.removeItem('trips')
    }
  }
})