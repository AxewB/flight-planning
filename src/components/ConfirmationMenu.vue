<template>
  <v-menu activator="parent">
    <v-sheet class="pa-2">
      <v-btn 
        color="error"
        @click="emit('OK')">Are you sure?</v-btn>
    </v-sheet>
  </v-menu>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['OK'])
</script>
