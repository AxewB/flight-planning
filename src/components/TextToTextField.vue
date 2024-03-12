<!-- eslint-disable vue/html-indent -->
<template>
  <v-sheet 
		class="bg-transparent d-flex justify-space-between" 
		width="100%"
    min-width="200px">
    <div 
      v-if="!isEditing"
      class="overflow-hidden cursor-text"
      @click="enableEditing()">
      <v-alert
        v-if="!modelValue"
        icon="mdi-alert-circle" 
        type="error"
        :title="'No ' + props.replacableText"
        :text="'Click me to edit ' + props.replacableText"
        variant="tonal"
      ></v-alert>
      {{ modelValue ? modelValue : '' }}
    </div>
    <v-text-field 
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
<!-- eslint-disable indent -->
<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  text: {
    type: String,
  },
	replacableText: {
		type: String
	},
})

const modelValue = ref(props.text);
const isEditing = ref(false);

const disableEditing = () => {
  isEditing.value = false;
}
const enableEditing = () => {
  isEditing.value = true;
}


</script>
