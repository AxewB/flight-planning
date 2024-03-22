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

    /**
     * Добавляет друга в список друзей и сохраняет изменения в local storage.
     *
     * @param {type} friend - друг которого нужно добавить
     * @return {type} 
     */
    addFriend(friend) {
      this.friends.push(friend)

      this.saveToLocalStorage()
    },
    /**
     * Удаляет друга с заданным id из списка друзей и сохраняет изменения в local storage.
     *
     * @param {string} id - id друга, которого нужно удалить
     */
    removeFriend(id) {
      this.friends = this.friends.filter((friend) => friend.id !== id)
      this.saveToLocalStorage()
    },
    /**
     * Загружает пример списка друзей и сохраняет его в local storage.
     *
     * @return {void}
     */
    loadExample() {
      this.friends = [...friendExample.friends];
      this.saveToLocalStorage();
    },
    /**
     * Сохраняет друзей в local storage.
     *
     * @return {void}
     */
    saveToLocalStorage() {
      localStorage.setItem('friends', JSON.stringify(this.friends))
    },
    /**
     * Загружает список друзей из local storage.
     *
     * @return {void}
     */
    loadFromLocalStorage() {
      const friends = JSON.parse(localStorage.getItem('friends'));
      if (friends) {
        this.friends = friends
      }
    },

    /**
     * Сбрасывает список друзей.
     *
     * @return {void}
     */
    resetStore() {
      this.friends = []
      localStorage.removeItem('friends')
    }
  }
})