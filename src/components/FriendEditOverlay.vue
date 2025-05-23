<template>
  <v-overlay
    @click:outside="resetOverlay"
    @after-leave="resetOverlay"
    v-model="isOverlayShown"
    class="d-flex justify-center align-center"
    :activator="activator"
  >
    <v-sheet 
      class="pa-4 rounded" 
      width="600px"
    >
      <v-sheet class="text-h5 mb-2">
        {{ title }}
      </v-sheet>
      <v-container>
        <v-row justify="center">
          <v-btn 
            icon
            size="100"
          >
            <v-icon>
              <v-avatar
                :image="newFriend.avatar.image"
                :color="!newFriend.avatar.image ? newFriend.avatar.color : ''"
                size="100"
              />
            </v-icon>
            <v-menu 
              activator="parent"
              :close-on-content-click="false"
            >
              <v-sheet class="pa-4">
                <v-container>
                  <v-row>
                    <v-text-field
                      label="Ссылка на картинку"
                      clearable
                      v-model="newFriend.avatar.image"
                    />
                  </v-row>
                  
                  <v-row 
                    wrap 
                    no-gutters
                    class="d-flex justify-center align-center"
                  >
                    <v-col class="text-center">
                      <v-divider/>
                    </v-col>
                    <v-col class="text-center">
                      Или
                    </v-col>
                    <v-col class="text-center">
                      <v-divider/>
                    </v-col>
                  </v-row>

                  <v-row class="d-flex flex-column">
                    <v-sheet class='d-flex mb-2 align-center'>
                      <p class="mr-2">
                        Выберите цвет для аватара
                      </p>
                      <v-btn 
                        variant="plain"
                        :ripple="false"
                      >
                        <v-icon icon="mdi-information"/>
                      
                        <v-tooltip 
                          activator="parent" 
                          location="bottom"
                          text="Отображается, если нет аватара"
                        />
                      </v-btn>
                    </v-sheet>
                    <v-color-picker v-model="newFriend.avatar.color"/>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-menu>
          </v-btn>
        </v-row>
        <v-form 
          v-model="isFormValid"
          class="mt-4">
          <v-row>
            <v-col>
              <v-text-field
                autofocus
                v-model="newFriend.firstName"
                label="Имя"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="newFriend.lastName"
                label="Фамилия"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="newFriend.email"
                label="Почта"
                type="email"
                :rules="[rules.required, rules.email]"
              />
            </v-col>
          </v-row>
          <v-row 
            justify="end">
            <v-btn 
              variant="text" 
              class="mr-2"
              @click="cancelEditing"
            >
              Отмена
            </v-btn>
            <v-btn 
              
              variant="text" 
              class="mr-2"
              @click="deleteFriend"
              color="error"
            >
              Удалить
            </v-btn>
            <v-btn 
              color="primary" 
              @click="confirmEditing"
              :disabled="!isFormValid"
            >
              Подтвердить
            </v-btn>
          </v-row>
        </v-form>
      </v-container>
    </v-sheet>
  </v-overlay>
</template>

<script setup>
import { defineProps, defineModel, defineEmits, onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import rules from '@/utils/rules';

// emits
const emit = defineEmits([
  'confirm', 
  'delete'
])

// props
const props = defineProps({
  title: {
    type: String,
    default: 'Add friend'
  },
  friend: {
    type: Object,
    default: () => {
      return {
        'id': uuidv4(),
        'avatar': {
          'color': "#CCCCCC",
          'image': ""
        },
        'firstName': '',
        'lastName': '',
        'email': '' 
      }
    }
  },
  isNew: {
    type: Boolean,
    default: true
  },
  activator: {
    type: String,
    default: ''
  }
})

// v-model
const isOverlayShown = defineModel({default: false})

// data 
const newFriend = ref({});
const isFormValid = ref(false)

// methods 
const confirmEditing = () => {
  emit('confirm', newFriend.value)
  isOverlayShown.value = false
}

const deleteFriend = () => {
  emit('delete', newFriend.value.id)
  isOverlayShown.value = false
}

const cancelEditing = () => {
  resetOverlay();
}

const resetOverlay = () => {
  if (props.isNew){ 
    newFriend.value = {
      'id': uuidv4(),
      'avatar': {
        'color': "#CCCCCC",
        'image': ""
      },
      'firstName': '',
      'lastName': '',
      'email': '' 
    }
  }
  isOverlayShown.value = false
}

// life cycle
onMounted(() => {
  newFriend.value = props.friend
})
</script>