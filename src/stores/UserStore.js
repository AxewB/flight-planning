import { defineStore } from 'pinia'
import userExample from '../example/userExample.json'
export const useUserStore = defineStore('user', {
  state: () => ({
    avatar: {
      color: "grey",
      image: '',
    },
    firstName: 'User',
    lastName: '',
    email: '',
  }),
  getters: {
    /**
     * Конкатенирует имя и фамилию для формирования полного имени.
     *
     * @param {Object} state - состояние приложения
     * @return {string} - Полное имя
     */
    fullName(state) {
      return state.firstName + ' ' + state.lastName;
    }
  },
  actions: {
    /**
     * Удаляет изображение аватара.
     *
     * @return {void} 
     */
    removeAvatarImage() {
      this.avatar.image = null
    },
    /**
     * Устанавливает данные в свойства объекта и сохраняет в локальное хранилище.
     *
     * @param {Object} data - данные пользователя
     *
     * @return {void} 
     */
    setData(data) {
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.email = data.email

      this.avatar.color = data.avatar.color
      this.avatar.image = data.avatar.image
      
      this.saveToLocalStorage();
    },
    /**
     * Загрузить пример и установить данные в userExample, затем сохранить в локальное хранилище.
     *
     * @return {void} 
     */
    loadExample() {
      this.setData(userExample);
      this.saveToLocalStorage();
    },
    /**
     * Сохраняет данные пользователя в локальное хранилище.
     *
     * @return {void} 
     * 
     */
    saveToLocalStorage() {
      const user = {
        avatar: this.avatar,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      }
      localStorage.setItem('user', JSON.stringify(user))
    },
    /**
     * Загружает данные пользователя из локального хранилища и устанавливает их в текущую инстанцию.
     *
     * @return {void} 
     */
    loadFromLocalStorage() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        this.setData(user)
      }
    },
    /**
     * Сбрасывает настройки пользователя на значения по умолчанию и удаляет пользователя из локального хранилища.
     *
     * @return {void} 
     */
    resetStore() {
      this.firstName = 'User'
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