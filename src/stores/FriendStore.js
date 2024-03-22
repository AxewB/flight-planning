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

    addFriend(friend) {
      this.friends.push(friend)
      this.saveToLocalStorage()
    },
    removeFriend(id) {
      this.friends = this.friends.filter((friend) => friend.id !== id)
      this.saveToLocalStorage()
    },
    loadExample() {
      this.friends = [...friendExample.friends];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('friends', JSON.stringify(this.friends))
    },
    loadFromLocalStorage() {
      const friends = JSON.parse(localStorage.getItem('friends'));
      if (friends) {
        this.friends = friends
      }
    },
    resetStore() {
      this.friends = []
      localStorage.removeItem('friends')
    }
  }
})