import { defineStore } from 'pinia'
import { useTripStore } from './TripStore';
import placeExample from '../example/placeExample.json'

export const usePlaceStore = defineStore('places', {
  state: () => ({
    tripStore: useTripStore(),  
    places: [],
  }),
  getters: {
    /**
     * Возвращает массив с названиями используемых мест
     *
     * @return {Array}
     */
    placesForAutocomplete(state) {
      const result = []; 
      state.places.forEach((place) => {
        result.push(place.name)
      })
      return result
    },
  },
  actions: {
    /**
     * Добавляет место в список
     */
    addPlace(place) {
      if (!place){
        return
      }

      if (!this.places) {
        this.places = [place]
      }
      else {
        this.places.push(place)
      }
      this.saveToLocalStorage();
    },
      
    /**
     * Удаляет место из списка
     * @param {string} id - id места 
     *
     * @return {void}
     */
    removePlace(id) {
      if (!id) {
        return
      }

      const placeName = this.places.find((place) => place.id === id).name
      if (!this.tripStore.tripPlaces || this.tripStore.tripPlaces.indexOf(placeName) === -1) {
        this.places = this.places.filter((place) => place.id !== id);
        this.saveToLocalStorage();
      } 
      else {
        return
      }
    },
    /**
     * Обновляет место в списке мест по его ID.
     * @param {Object} newPlace - Обновленное место. Объект со свойствами: id, name.
     * @return {void}
     */
    updatePlace(newPlace) {
      const index = this.places.findIndex((place) => place.id === newPlace.id);
      this.places[index] = newPlace;
      this.saveToLocalStorage();
    },
    /**
     * Загружает пример места.
     * 
     * @return {void}
     */
    loadExample() {
      this.places = [...placeExample.places];
      this.saveToLocalStorage();
    },
    
    /**
     * Сохраняет текущее состояние массива мест в хранилище локального хранилища.
     *
     * @return {void} 
     */
    saveToLocalStorage() {
      localStorage.setItem('places', JSON.stringify(this.places))
    },
    /**
     * Загружает данные из хранилища локального хранилища и присваивает их 'places' если они доступны.
     */
    loadFromLocalStorage() {
      const places = JSON.parse(localStorage.getItem('places'));
      if (!places) {
        this.places = []
        return
      } 

      this.places = places
    },
    /**
     * Сбрасывает хранилище
     */
    resetStore() {
      this.places = []
      localStorage.removeItem('places')
    }
  },
  
})