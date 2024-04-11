<template>
  <v-switch
    :model-value="theme.global.name.value === 'dark'"
    label="Темная тема"
    hide-details
    color="#0083F5"
    @click="toggleTheme()"
  />
</template>

<script setup>
import { useTheme } from 'vuetify';
const theme = useTheme();
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>

<style lang="scss" scoped>

</style>