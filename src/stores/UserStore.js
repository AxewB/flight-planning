import { defineStore } from 'pinia'
import userExample from '../example/userExample.json'
export const useUserStore = defineStore('user', {
  state: () => ({
    // avatar: {
    //   color: "red",
    //   image: 'https://randomuser.me/api/portraits/women/34.jpg',
    // },
    // firstName: 'David',
    // lastName: 'Brown',
    // email: 'd.brown@gmailcom',
    avatar: {
      color: "grey",
      image: '',
    },
    firstName: 'User',
    lastName: '',
    email: '',
  }),
  getters: {
    fullName(state) {
      return state.firstName + ' ' + state.lastName;
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
      
      this.saveToLocalStorage();
    },
    loadExample() {
      this.setData(userExample);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const user = {
        avatar: this.avatar,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      }
      localStorage.setItem('user', JSON.stringify(user))
    },
    loadFromLocalStorage() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        this.setData(user)
      }
    },
    resetStore() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.avatar = {
        color: "grey",
        image: '',
      }
      localStorage.removeItem('user')
    }
  }
})