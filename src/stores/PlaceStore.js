import { defineStore } from 'pinia'
import { useTripStore } from './TripStore';
import placeExample from '../example/placeExample.json'

export const usePlaceStore = defineStore('places', {
  state: () => ({
    tripStore: useTripStore(),  
    // places: [
    //   {
    //     id: '3831bd70-3dc0-4678-96b0-15e70934a48d',
    //     name: 'Venice',
    //   },
    //   {
    //     id: '63f1de16-60b7-48eb-aec5-1d0918a7d1f8',
    //     name: 'Paris',
    //   },
    //   {
    //     id: 'd79f40f4-1f56-4bb9-bdfe-d9ba282a90bd',
    //     name: 'Rome',
    //   },
    //   {
    //     id: '44192957-d76d-4e83-857c-0daed6810543',
    //     name: 'Colosseum',
    //   },
    //   {
    //     id: 'fd507256-496e-4bfc-87f3-592e68e47e5f',
    //     name: 'Hanauma Bay',
    //   },
    //   {
    //     id: '6c80c50a-0446-4427-bde4-6395a07c4622',
    //     name: 'Hawaii',
    //   },
    //   {
    //     id: '4424a057-ee7f-4846-b977-dcac153f815c',
    //     name: 'London',
    //   },
    //   {
    //     id: '593937ed-3a81-414e-876f-f4e8fda4dca6',
    //     name: 'New York',
    //   },
    //   {
    //     id: 'c9e1d8e2-a0c3-44fd-a248-453abe2bd682',
    //     name: 'Sydney',
    //   },
    //   {
    //     id: '284db294-13f1-43ff-ad22-d41773ee192d',
    //     name: 'Tokyo',
    //   },
    //   {
    //     id: '791127e5-4e11-4cbd-80b9-d32c55911f84',
    //     name: 'Moscow',
    //   },

    // ]
    places: []
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
      this.places.push(place)
    },
    removePlace(id) {
      const placeName = this.places.find((place) => place.id === id).name
      if (this.tripStore.tripPlaces.indexOf(placeName) === -1) {
        this.places = this.places.filter((place) => place.id !== id);
      } else {
        return
      }
    },
    updatePlace(newPlace) {
      const index = this.places.findIndex((place) => place.id === newPlace.id);
      this.places[index] = newPlace;
    },
    loadExample() {
      this.places = [...placeExample.places]
    }
  },
  
})