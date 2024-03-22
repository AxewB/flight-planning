<template>
  <v-overlay 
    :model-value="props.isConfirmationShow"
    class="d-flex justify-center align-center">
    <v-card 
      :title="props.title"
      :text="props.text">
      <v-card-actions>
        <v-btn 
          @click="emit('confirm')"
          color="error">
          Подтвердить
        </v-btn>
        <v-btn @click="emit('cancel')">
          Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
const props = defineProps({
  isConfirmationShow: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Вы уверены?'
  },
  text: {
    type: String
  }
})

const emit = defineEmits(['cancel', 'confirm'])
</script>
