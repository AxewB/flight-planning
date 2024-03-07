<template>
  <v-sheet 
    class="pa-4 d-flex flex-column"
    width="400px">
    <VTextField label="Title"/>
    <v-sheet width="100%">
      <v-btn @click="closeWindow">Cancel</v-btn>
      <v-btn @click="saveTask()">Save</v-btn>
    </v-sheet>
    
  </v-sheet>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['closeWindow'])


const saveTask = () => {
  
  emit('closeWindow');
}
const closeWindow = () => {
  emit('closeWindow');
}
</script>