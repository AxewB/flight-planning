<template>
  <v-sheet 
    class="pa-4 d-flex flex-column" 
    width="600px"
    rounded>
    <v-sheet class="bg-transparent d-flex flex-column mb-4 justify-center align-center">
      <div class="text-h6 mb-2">User info</div>
      <v-btn 
        size="80" 
        icon>
        <v-tooltip 
          activator="parent" 
          location="bottom">asd</v-tooltip>
        <v-avatar 
          :image="userData.avatar.image" 
          :color="userData.avatar.color"
          size="80"
          class="mb-4"/>
        <v-menu activator="parent">
          <v-sheet class="pa-4">
            <v-sheet>
              <v-btn 
                v-if="userData.avatar.image" 
                prepend-icon="mdi-trash-can">
                Remove image
              </v-btn>
            </v-sheet>
            <v-sheet class="d-flex flex-row align-center ">
              <v-btn 
                elevation="0">
                Change color
                <template #prepend>
                  <VIcon 
                    icon="mdi-circle"
                    :color="userData.avatar.color"/>
                </template>
                <v-menu activator="parent">
                  <v-sheet>
                    <v-color-picker v-model="userData.avatar.color"></v-color-picker>
                  </v-sheet>
                </v-menu>
              </v-btn>
            </v-sheet>
          </v-sheet>
        </v-menu>
      </v-btn>
      
      
    </v-sheet>  
    <v-sheet class="bg-transparent d-flex mb-4">
      <v-text-field 
        class="mx-2"
        variant="solo-filled" 
        label="First name"
        denstiy="compact"
        hide-details
        v-model="userData.firstName"/>
      <v-text-field 
        class="mx-2"
        variant="solo-filled" 
        label="Last name"
        denstiy="compact"
        hide-details
        v-model="userData.lastName"/>
    </v-sheet>
    <v-sheet class="bg-transparent d-flex mb-4">
      <v-text-field 
        class="mx-2"
        variant="solo-filled" 
        label="E-mail"
        denstiy="compact"
        type="email"
        hide-details
        v-model="userData.email"/>
    </v-sheet>
    <v-sheet class="d-flex flex-row justify-end">
      <v-btn 
        variant="text" 
        @click="closeWindow()"
        class="mr-2">
        Close
      </v-btn>
      <v-btn 
        variant="tonal" 
        color="primary"
        @click="acceptData()">
        Accept
      </v-btn>
    </v-sheet>
  </v-sheet>
  
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore';
import { ref, defineEmits } from 'vue'


const emit = defineEmits(['closeWindow'])
const userStore = useUserStore();

const userData = ref({
  avatar: userStore.avatar,
  firstName: userStore.firstName,
  lastName: userStore.lastName,
  email: userStore.email
})

const acceptData = () => {
  userStore.setData(userData.value);
  closeWindow();
}
const closeWindow = () => {
  emit('closeWindow');
}
</script>