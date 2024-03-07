import { defineStore } from 'pinia'

export const useFriendStore = defineStore('friends', {
  state: () => ({
    friends: [
      {
        avatar: {
          color: "red",
          image: 'https://randomuser.me/api/portraits/women/85.jpg',
        },
        firstName: 'fName',
        lastName: 'lName',
        email: 'someuser_email@gmailcom',

        trips: {
          1: 300,
          2: 400
        }
      } 
    ]
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
    }
  }
})