<template>
  <v-menu activator="parent">
    <v-sheet class="pa-4 rounded border d-flex flex-column justify-center align-center">
      <v-sheet class="mb-4">{{ message }}</v-sheet>
      <v-btn 
        color="primary"
        @click="emit('OK')">Confirm</v-btn>
    </v-sheet>
  </v-menu>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
const props = defineProps(['message'])

const emit = defineEmits(['OK'])
</script>
