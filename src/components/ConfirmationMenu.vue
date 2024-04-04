<template>
  <v-menu activator="parent">
    <v-sheet 
      class="pa-4 
            rounded 
            border 
            d-flex 
            flex-column 
            justify-center 
            align-center"
    >
      <v-sheet class="mb-4">
        {{ props.message }}
      </v-sheet>
      <v-btn 
        color="primary"
        @click="emit('ok')"
      >
        Подтвердить
      </v-btn>
    </v-sheet>
  </v-menu>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

// props
const props = defineProps({
  'message': {
    type: String,
  }
})

// emits
const emit = defineEmits(['ok'])
</script>
