<template>
  <v-sheet 
    class="pa-4 
          d-flex 
          justify-center"
  >
    <v-sheet width="100%">
      <v-sheet 
        class="text-h4 
              d-flex 
              justify-space-between"
      >
        Друзья
        <v-btn
          @click="showAddFriendOverlay = true"
          color="primary"
        >
          Добавить друга
        </v-btn>
      </v-sheet>
      <VDivider class="my-4"/>
    

      <draggable
        :list="friendStore.friends"
        tag="v-sheet"
        handle=".handle" 
        item-key="id"
        @end="saveAfterMoving()"
      >
        <template #item="{element: friend}">
          <v-list-item
            class="d-flex pa-2 rounded" 
            link
            :ripple="true">
            <template #prepend>
              <VIcon 
                class="handle mx-5" 
                size="30" 
                icon="mdi-drag"
              />
              <VAvatar
                :image="friend.avatar.image"
                :color="!friend.avatar.image ? friend.avatar.color : ''"
                size="80"
              />
            </template>
            <template #default>
              <FriendEditOverlay 
                :friend="friend"
                :activator="'parent'"
                :is-new="false"
                @delete="deleteFriend"
                title="Редактировать друга"/>  
              <v-sheet 
                class="ml-4" 
                width="100%"
              >
                <v-sheet 
                  class="d-flex justify-space-between" 
                  width="100%"
                >
                  <div>
                    {{ friendStore.fullName(friend.id) }}
                  </div>
                </v-sheet>
                <div class="text-disabled">
                  {{ friend.email }}
                </div>
              </v-sheet>  
            </template>
          </v-list-item>
        </template>
      </draggable>
    </v-sheet>
    <FriendEditOverlay 
      :activator="'parent'"
      v-model="isAddingFriend"
      @confirm="addFriend"
      title="Добавить друга"
      is-new
    />
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import { useFriendStore } from '@/stores/FriendStore';
import FriendEditOverlay from '@/components/FriendEditOverlay.vue';
import draggable from 'vuedraggable';

// stores
const friendStore = useFriendStore();

// variables
const isAddingFriend = ref(false);

// methods 
const addFriend = (friend) => {
  friendStore.addFriend(friend);
  isAddingFriend.value = false;
}

const deleteFriend = (id) => {
  friendStore.deleteFriend(id);
}

const saveAfterMoving = () => {
  friendStore.saveToLocalStorage();  
}


</script>