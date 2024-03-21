import { defineStore } from 'pinia'
import friendExample from '../example/friendExample.json'

export const useFriendStore = defineStore('friends', {
  state: () => ({
    friends: []
  }),
  getters: {
    fullName: (state) => {
      return (id) => {
        const friend = state.friends.find((friend) => friend.id === id)
        if (friend) {
          return friend.firstName + ' ' + friend.lastName
        }
      }
    },
    getRandomFriends: (state) => {
      return [...state.friends].sort(() => Math.random() - 0.5).slice(0, 5)
    }
  },
  actions: {

    removeAvatarImage() {
      this.avatar.image = null
    },
    setData(data) {
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.email = data.email

      this.avatar.color = data.avatar.color
      this.avatar.image = data.avatar.image
    },
    loadExample() {
      this.friends = [...friendExample.friends];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('friends', JSON.stringify(this.friends))
    },
    loadFromLocalStorage() {
      this.friends = JSON.parse(localStorage.getItem('trips'))
    },
    resetStore() {
      this.friends = []
      localStorage.removeItem('friends')
    }
  }
})