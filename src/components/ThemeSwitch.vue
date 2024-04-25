<template>
  <v-switch
    :model-value="theme.global.name.value === 'dark'"
    label="Темная тема"
    hide-details
    color="#0083F5"
    @click="toggleTheme"
  />
</template>

<script setup>
import { useTheme } from 'vuetify';
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();
const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  userStore.appTheme = theme.global.name.value;
  userStore.saveToLocalStorage();
}

</script>
