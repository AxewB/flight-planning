<template>
  <v-card 
    class="pa-4 d-flex flex-column" 
    width="600px"
    rounded>
    <v-sheet 
      class="bg-transparent 
            d-flex 
            flex-column 
            mb-4 
            justify-center 
            align-center">
      <v-overlay 
        v-model="showAvatarChangeOverlay"
        contained 
        width="100%" 
        height="100%"
        class="d-flex 
              justify-center 
              align-center">
        <v-sheet 
          class="d-flex 
                flex-column 
                justify-center 
                align-center 
                pa-5" 
          height="100%">
          <div class="text-h6 mb-2">
            Вставьте ссылку на картинку
          </div>
          <v-sheet
            width="100%">
            <VTextField 
              v-model="userData.avatar.image" 
              hide-details/>
          </v-sheet>
          
          <v-sheet 
            class="d-flex justify-end mt-2" 
            width="100%">
            <v-btn 
              class="mr-2"
              variant="text" 
              @click="closeAvatarChangeOverlay(true)">
              Отмена
            </v-btn>
            <v-btn 
              color="primary"
              @click="closeAvatarChangeOverlay(false)">
              Принять
            </v-btn>
          </v-sheet>
          

        </v-sheet>

      </v-overlay>
      <div class="text-h6 mb-2">Пользователь</div>
      <v-btn 
        size="80" 
        icon>
        <v-tooltip 
          activator="parent" 
          location="bottom">Изменить изображение</v-tooltip>
        <v-avatar 
          :image="userData.avatar.image" 
          :color="userData.avatar.image ? '' : userData.avatar.color"
          size="80"
          class="mb-4"/>
        <v-menu 
          activator="parent"
          :close-content-on-click="false">
          <v-sheet class="pa-4">
            <v-sheet>
              <v-btn 
                prepend-icon="mdi-trash-can"
                @click="toggleAvatarImage()">
                {{ userData.avatar.image ? "Remove image" : "Add image" }}
              </v-btn>
            </v-sheet>
            <v-sheet 
              class="d-flex 
                    flex-row 
                    align-center ">
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
                    <VColorPicker v-model="userData.avatar.color"/>
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
        Закрыть
      </v-btn>
      <v-btn 
        color="primary"
        @click="acceptData()">
        Принять
      </v-btn>
    </v-sheet>
  </v-card>
  
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore';
import { ref, defineEmits } from 'vue'

// emits
const emit = defineEmits(['closeWindow'])

// stores
const userStore = useUserStore();

// variables
const userData = ref({
  avatar: userStore.avatar,
  firstName: userStore.firstName,
  lastName: userStore.lastName,
  email: userStore.email
});
const showAvatarChangeOverlay = ref(false);

// methods
const acceptData = () => {
  userStore.setData(userData.value);
  closeWindow();
}
const closeWindow = () => {
  emit('closeWindow');
}

const toggleAvatarImage = () => {
  if (userData.value.avatar.image) {
    userData.value.avatar.image = null
  }
  else {
    showAvatarChangeOverlay.value = true
  }
}
const closeAvatarChangeOverlay = (isCancelling) => {
  if (isCancelling) {
    userData.value.avatar.image = null
  }
  showAvatarChangeOverlay.value = false
}
</script>