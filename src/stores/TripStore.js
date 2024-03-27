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
    /**
     * Возвращает функцию, которая фильтрует задания, основываясь на настройках фильтрации
     *
     * @param {Object} state - Состояние приложения
     * @return {Function} - Функция фильтрации
     */
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
    /**
     * Проверка, являются ли задания в правильном порядке, основываясь на дате
     *
     * @param {array} tasks - Массив заданий 
     * @return {boolean} - Возвращает true, если задания в правильном порядке
     */
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
    /**
   * Проверяет, являются ли подзадания в правильном порядке, основываясь на времени
   *
   * @param {Array} subtasks - Массив подзаданий
   * @return {boolean} Возвращает true, если подзадания в правильном порядке
   */
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
    /**
     * Сортирует поездки в state объекте по дате.
     *
     * @param {Object} state - Состояние хранилища
     * @return {Array|null} - Отсортированный массив поездок
     */
    sortTripsByDate(state) {
      if (!state.trips) 
        return null;
      else
        return state.trips.sort((a, b) => new Date(a.date.begin) - new Date(b.date.begin))
    },
    /**
     * Возаращает ближайшую по дате поездку
     *
     * @param {object} state - Состояние хранилища
     * @return {object|null} - Ближайшая поездка
     */
    closestTrip(state) {
      if (!state.trips) 
        return null;
      else
        return state.sortTripsByDate[0];
    },
    /**
     * Функция возвращает массив мест, которые используются в поездках
     *
     * @param {Object} state - Состояние хранилища
     * @return {Array} - Массив мест
     */
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
    /**
     * Эта функция добавляет новую поездку в список поездок. 
     * Если список поездок не существует, она создается.
     * После добавления данные сохраняются в localStorage
     * 
     * @return {void} 
     */
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
    /**
     * Удаляет поездку из списка поездок с заданным ID.
     *
     * @param {number} id - ID поездки которую нужно удалить
     * @return {void} 
     */
    removeTrip(id) {
      this.trips = this.trips.filter((trip) => trip.id !== id);
      this.saveToLocalStorage();
    },
    /**
     * Копирует выбранную поездку и добавляет её в список поездок, затем сохраняет обновленный список в localStorage
     *
     * @param {Object} trip - Поездка, которую нужно скопировать
     * @return {void} 
     */
    copyTrip(trip) {
      const newTrip = { ...trip };
      newTrip.id = uuidv4();
      newTrip.title = `Copy of ${trip.title}`
      this.trips.push(newTrip);
      this.saveToLocalStorage();
    },
    /**
     * Удаляет изображение поездки по ID
     *
     * @param {type} id - ID поездки с которой нужно удалить изображение
     * @return {type} 
     */
    removeTripImage(id) {;
      this.trips.find(trip => trip.id === id).avatar.image = null;
      this.saveToLocalStorage();
    },
    /**
     * Добавляет задачу в поездку и сохраняет изменения в localStorage
     *
     * @param {Object} trip - Поездка в которую нужно добавить задачу
     * @param {Object} task - Задача, которую нужно добавить
     * @return {void} 
     */
    addTaskToTrip(trip, task) {
      trip.tasks.push(task);
      this.saveToLocalStorage();
    },
    /**
     * Обовляет задачу в поездке
     *
     * @param {Object} task - Исходная задача
     * @param {Object} newTask - Новая задача
     * @return {void} 
     */
    updateTaskInTrip(task, newTask) {
      task = newTask;
      this.saveToLocalStorage();
    },
    /**
     * Удаляет задачу из поездки
     *
     * @param {object} trip - Поездка в которой нужно удалить задачу
     * @param {number} taskId - ID задачи которую нужно удалить
     * @return {void} 
     */
    removeTaskFromTrip(trip, rm_task) {
      trip.tasks = trip.tasks.filter((task) => task.id !== rm_task.id);
      this.saveToLocalStorage();
    },
    /**
     * Сбрасывает настройки фильтров для даты и стоимости.
     */
    resetFilters() {
      this.filterSettings = {
        date: {
          begin: '',
          end: '',
        },
        cost: 0,
      }
    },
    /**
     * Устанавливает переданные настройки фильтров в свойство filterSettings
     *
     * @param {Object} settings - Настройки фильтров
     * @return {void} 
     */
    applyFilterSettings(settings) {
      const {date, cost} = settings;
      this.filterSettings = {
        date,
        cost,
      }
    },
    /**
     * Загружает пример в свойство trips и сохраняет его в localStorage
     */
    loadExample() {
      this.trips = [...tripExample.trips];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
    /**
     * Сохраняет текущее состояние поездок в localStorage
     *
     * @return {void} 
     */
      localStorage.setItem('trips', JSON.stringify(this.trips))
    },
    loadFromLocalStorage() {
      const trips = JSON.parse(localStorage.getItem('trips'));
      if (trips) {
        this.trips = trips
      }
    },
    /**
     * Сбрасывает хранилище, очищая все поездки и удаляя запись 'trips' из localStorage
     */
    resetStore() {
      this.trips = []
      localStorage.removeItem('trips')
    }
  }
})