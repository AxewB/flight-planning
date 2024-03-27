<template>
  <v-sheet class="pa-4 d-flex justify-center">
    <v-sheet width="100%">
      <v-sheet 
        class="text-h4 
              d-flex 
              justify-space-between">
        Друзья
        <v-btn
          @click="addFriend()"
          color="primary">
          Добавить друга
        </v-btn>
      </v-sheet>
      <VDivider class="my-4"/>
      <v-sheet 
        v-for="friend in friendStore.friends" 
        :key="friend.id">
        <v-sheet class="d-flex">
          <VAvatar
            :image="friend.avatar.image"
            :color="!friend.avatar.image ? friend.avatar.color : ''"
            size="80"/>
          <v-sheet 
            class="ml-4" 
            width="100%">
            <v-sheet 
              class="d-flex justify-space-between" 
              width="100%">
              <div>
                {{ friendStore.fullName(friend.id) }}
              </div>
              <v-btn 
                icon
                variant="text">
                <VIcon icon="mdi-menu"/>
                <v-menu 
                  activator="parent"
                  :open-on-hover="true"
                  :close-on-content-click="false">
                  <v-list 
                    density="compact"
                    class="pa-2 rounded">
                    <v-list-item 
                      @click="editFriend(friend)">
                      Edit
                    </v-list-item>
                    <v-list-item 
                      @click="removeFriend(friend.id)">
                      Remove
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </v-sheet>
            <div class="text-disabled">
              {{ friend.email }}
            </div>
          </v-sheet>
        </v-sheet>
        <VDivider class="my-4"/>
      </v-sheet>
    </v-sheet>
    <v-overlay
      @click:outside="showEditingOverlay = false"
      @after-leave="showEditingOverlay = false"
      :model-value="showEditingOverlay"
      class="d-flex justify-center align-center">
      <v-sheet 
        class="pa-4 rounded" 
        width="600px">
        <v-sheet class="text-h5 mb-2">
          {{ editingMode === 'add' ? 'Добавить' : 'Редактировать' }} друга
        </v-sheet>
        <v-container>
          <v-row justify="center">
            <v-btn 
              icon
              size="100">
              <VIcon>
                <VAvatar
                  :image="editableFriend.avatar.image"
                  :color="!editableFriend.avatar.image ? editableFriend.avatar.color : ''"
                  size="100"/>
              </VIcon>
              <v-menu 
                activator="parent"
                :close-on-content-click="false">
                <v-sheet class="pa-4">
                  <v-container>
                    <v-row>
                      <VTextField
                        label="Avatar"
                        clearable
                        v-model="editableFriend.avatar.image"/>
                    </v-row>
                    <VDivider class="my-2"/>
                    <v-row class="d-flex flex-column">
                      <v-sheet class='d-flex mb-2 align-center'>
                        <p class="mr-2">Выберите цвет для аватара</p>
                        <v-btn 
                          icon 
                          variant="plain">
                          <VIcon icon="mdi-information"/>
                          <VTooltip 
                            activator="parent" 
                            location="bottom"
                            text="Отображается, если нет аватара"/>
                        </v-btn>
                      </v-sheet>
                      <VColorPicker 
                        v-model="editableFriend.avatar.color"/>
                    </v-row>
                  </v-container>
                </v-sheet>
              </v-menu>
            </v-btn>
          </v-row>
          <v-row>
            <v-col>
              <VTextField
                v-model="editableFriend.firstName"
                label="First name"
                hide-details/>
            </v-col>
            <v-col>
              <VTextField
                v-model="editableFriend.lastName"
                label="Last name"
                hide-details/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <VTextField
                v-model="editableFriend.email"
                label="Email"
                hide-details
                type="email"/>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn 
              variant="text" 
              class="mr-2"
              @click="showEditingOverlay = false">
              Отмена
            </v-btn>
            <v-btn 
              color="primary"
              @click="confirmEditing()">
              Подтвердить
            </v-btn>
          </v-row>
        </v-container>
      </v-sheet>
    </v-overlay>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import { useFriendStore } from '@/stores/FriendStore';
import { v4 as uuidv4 } from 'uuid';

// stores
const friendStore = useFriendStore();

// variables
const showEditingOverlay = ref(false);
const editingMode = ref('')
const editableFriend = ref(null);

// methods
const editFriend = (friend) => {
  editableFriend.value = friend;
  editingMode.value = 'edit';
  showEditingOverlay.value = true;
}

const addFriend = () => {
  editableFriend.value = {
    id: uuidv4(),
    avatar: {
      color: "grey",
      image: ""
    },
    firstName: '',
    lastName: '',
    email: ''
  };
  editingMode.value = 'add';
  showEditingOverlay.value = true;
}

const removeFriend = (id) => {
  friendStore.removeFriend(id);
  showEditingOverlay.value = false;
  editingMode.value = '';
}

const confirmEditing = () => {
  if (editingMode.value === 'add') {
    friendStore.addFriend(editableFriend.value);
  }
  showEditingOverlay.value = false;
  editingMode.value = '';
}
</script>