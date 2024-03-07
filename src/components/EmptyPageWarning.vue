<template>
  <v-sheet 
    class="d-flex flex-column justify-center align-center pa-2"
    width="100%"
    border>
    <v-sheet class="text-h6 mb-2"> 
      {{ props.title }}
    </v-sheet>
    <v-sheet class="mb-2">
      {{ props.text }}
    </v-sheet>
    <v-sheet class="d-flex flex-row justify-end">
      <slot name="actions"></slot>  
    </v-sheet>
    
  </v-sheet>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['title', 'text'])

</script>