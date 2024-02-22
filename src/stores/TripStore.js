import { defineStore } from 'pinia'

export const useTripStore = defineStore('trip', {
  state: () => ({
    trips: [
      {
        id: 2, 
        name: 'trip2', 
        image: 'https://www.comune.venezia.it/sites/comune.venezia.it/files/immagini/Turismo/Buone_pratiche_Ghetto.jpeg',
        cost: 2000,
        isDone: false, 
        date: {
          begin: '2022-01-01', 
          end: '2022-01-01'
        },
        description: 'description2',
        tags: ['tag1', 'tag2']
      }, 
      {
        id: 2, 
        name: 'trip2', 
        image: 'https://www.comune.venezia.it/sites/comune.venezia.it/files/immagini/Turismo/Buone_pratiche_Ghetto.jpeg',
        cost: 2000,
        isDone: false, 
        date: {
          begin: '2022-01-01', 
          end: '2022-01-01'
        },
        description: 'description2',
        tags: ['tag1', 'tag2']
      } 
    ]
  }),
  actions: {
    addTrip(trip) {
      this.trips.push(trip)
    },
  }
})