<template>
  <v-sheet 
    class="bg-transparent 
          d-flex 
          justify-space-between" 
    width="100%"
    min-width="200px">
    <div 
      v-if="!isEditing"
      class="overflow-hidden cursor-text"
      @click="enableEditing()">
      <VAlert
        v-if="!modelValue"
        icon="mdi-alert-circle" 
        type="error"
        :title="'No ' + props.replacableText"
        :text="'Click me to edit ' + props.replacableText"
        variant="tonal"/>
      {{ modelValue ? modelValue : '' }}
    </div>
    <VTextField 
      v-else
      autofocus
      variant="solo-filled"
      hide-details
      density="compact"
      @keydown.enter.prevent="disableEditing()"
      v-click-outside="{
        handler: disableEditing,
      }"
      v-model="modelValue"
      @update:modelValue="$emit('update:modelValue', modelValue)"/>
  </v-sheet>
</template>
<script setup>
import { defineProps, ref, onBeforeUpdate } from 'vue';

// props
const props = defineProps({
  text: {
    type: String,
  },
  replacableText: {
    type: String
  },
})

// variables
const modelValue = ref(props.text);
const isEditing = ref(false);

// methods
const disableEditing = () => {
  isEditing.value = false;
}
const enableEditing = () => {
  isEditing.value = true;
}

// lifecycle
onBeforeUpdate(() => {
  modelValue.value = props.text
})
</script>
