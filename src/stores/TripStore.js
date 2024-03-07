import { defineStore } from 'pinia'

export const useTripStore = defineStore('trip', {
  state: () => ({
    trips: [
      {
        id: '0', 
        name: 'Trip to Venice', 
        avatar: {
          color: "blue",
          image: 'https://www.comune.venezia.it/sites/comune.venezia.it/files/immagini/Turismo/Buone_pratiche_Ghetto.jpeg',
        },
        budget: 1500,
        isDone: false, 
        date: {
          begin: '2024-04-10', 
          end: '2024-04-15'
        },
        description: 'Exploring the canals and architecture of Venice.',
        tasks: [
          {
            title: "Explore St. Mark's Square",
            date: '2024-04-10',
            subTasks: 
            [
              {
                title: "Visit St. Mark's Basilica",
                time: '10:00',
              },
              {
                title: "Take a gondola ride",
                time: '14:00',
              }
            ]
          },
          {
            title: "Discover Murano Island",
            date: '2024-04-11',
            subTasks: 
            [
              {
                title: "Tour glass factories",
                time: '11:00',
              },
              {
                title: "Shop for Murano glass souvenirs",
                time: '15:00',
              }
            ]
          }
        ],
        notes: 'Venice is known for its rich history, beautiful architecture, and intricate canal system.',
        tags: ['Italy', 'Travel']
      },
      {
        id: '1', 
        name: 'Beach Vacation in Hawaii', 
        avatar: {
          color: "green",
          image: 'https://www.hawaii-guide.com/images/made/images/uploads/articles/panoramic_view_of_hawaii_1200_720_80.jpg',
        },
        budget: 3000,
        isDone: false, 
        date: {
          begin: '2024-06-20', 
          end: '2024-06-27'
        },
        description: 'Relaxing on the sandy beaches and exploring the natural beauty of Hawaii.',
        tasks: [
          {
            title: "Snorkel at Hanauma Bay",
            date: '2024-06-21',
            subTasks: 
            [
              {
                title: "Rent snorkel gear",
                time: '09:00',
              },
              {
                title: "Explore coral reefs",
                time: '11:00',
              }
            ]
          },
          {
            title: "Hike to Diamond Head Summit",
            date: '2024-06-23',
            subTasks: 
            [
              {
                title: "Start hike",
                time: '08:00',
              },
              {
                title: "Enjoy panoramic views",
                time: '10:00',
              }
            ]
          }
        ],
        notes: 'Hawaii offers a perfect blend of relaxation and adventure with its stunning beaches and volcanic landscapes.',
        tags: ['Beach', 'Adventure']
      },
      {
        id: '2', 
        name: 'European Backpacking Adventure', 
        avatar: {
          color: "orange",
          image: 'https://www.tourradar.com/days-to-come/wp-content/uploads/2018/09/5-travel-tips-for-backpacking-Europe.jpg',
        },
        budget: 5000,
        isDone: false, 
        date: {
          begin: '2024-08-01', 
          end: '2024-08-30'
        },
        description: 'Exploring the rich culture and history of Europe on a backpacking journey.',
        tasks: [
          {
            title: "Visit the Eiffel Tower in Paris",
            date: '2024-08-05',
            subTasks: 
            [
              {
                title: "Take photos",
                time: '10:00',
              },
              {
                title: "Enjoy a picnic nearby",
                time: '12:00',
              }
            ]
          },
          {
            title: "Explore the Colosseum in Rome",
            date: '2024-08-15',
            subTasks: 
            [
              {
                title: "Join a guided tour",
                time: '11:00',
              },
              {
                title: "Learn about ancient Roman history",
                time: '14:00',
              }
            ]
          }
        ],
        notes: 'Backpacking through Europe allows for a unique and immersive travel experience, discovering hidden gems and iconic landmarks along the way.',
        tags: ['Europe', 'Backpacking']
      }
    ]
  }),
  actions: {
    addTrip(trip) {
      this.trips.push(trip)
    },
    removeTripImage(id) {;
      console.log(id);
      this.trips.find(trip => trip.id === id).avatar.image = null;


    }
  }
})