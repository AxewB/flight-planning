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
    },
    loadExample() {
      const {avatar, firstName, lastName, email} = userExample;
      this.avatar = avatar
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
    }
  }
})