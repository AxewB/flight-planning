import { defineStore } from 'pinia'
import { useTripStore } from './TripStore';
import placeExample from '../example/placeExample.json'

export const usePlaceStore = defineStore('places', {
  state: () => ({
    tripStore: useTripStore(),  
    places: [],
  }),
  getters: {
    placesForAutocomplete(state) {
      const result = []; 
      state.places.forEach((place) => {
        result.push(place.name)
      })
      return result
    },
  },
  actions: {
    addPlace(place) {
      if (!this.places) {
        this.places = [place]
      }
      else {
        this.places.push(place)
      }
      
      this.saveToLocalStorage();
    },
    removePlace(id) {
      const placeName = this.places.find((place) => place.id === id).name
      if (!this.tripStore.tripPlaces || this.tripStore.tripPlaces.indexOf(placeName) === -1) {
        this.places = this.places.filter((place) => place.id !== id);
        this.saveToLocalStorage();
      } 
      else {
        return
      }
    },
    updatePlace(newPlace) {
      const index = this.places.findIndex((place) => place.id === newPlace.id);
      this.places[index] = newPlace;
      this.saveToLocalStorage();
    },
    loadExample() {
      this.places = [...placeExample.places];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('places', JSON.stringify(this.places))
    },
    loadFromLocalStorage() {
      const places = JSON.parse(localStorage.getItem('places'));
      if (places) {
        this.places = places
      } 
    },
    resetStore() {
      this.places = []
      localStorage.removeItem('places')
    }
  },
  
})