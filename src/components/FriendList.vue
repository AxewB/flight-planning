<template>
  <v-sheet v-if="friendStore.friends.length === 0">
    <EmptyPageWarning 
      title="No friends yet" 
      text="Add your first friend">
      <template #actions>
        <v-btn @click="friendStore.addFriend()">Add friend</v-btn>
      </template>
    </EmptyPageWarning>
  </v-sheet>
  <v-list 
    lines="two"
    v-else>
    <v-list-item 
      v-for="friend in friendStore.friends" 
      :key="friend.id">
      <template #prepend>
        <VAvatar  
          :image="friend.avatar.image"
          :color="!friend.avatar.image ? friend.avatar.color : ''"
          size="40"/>
      
      </template>
      <v-list-item-title>{{ friendStore.fullName(friend.id) }}</v-list-item-title>
      <v-list-item-subtitle>
        {{ friend.email }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { useFriendStore } from '@/stores/FriendStore';
import EmptyPageWarning from '@/components/EmptyPageWarning.vue';
const friendStore = useFriendStore();

</script>
