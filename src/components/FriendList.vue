<template>
  <v-sheet v-if="!isFriendListExists">
    <EmptyPageWarning 
      title="Друзей нет" 
      text="Добавьте друзей в список"
    >
      <template #actions>
        <v-btn :to="{ name: 'friends' }">
          Добавить друга
        </v-btn>
      </template>
    </EmptyPageWarning>
  </v-sheet>
  <v-list 
    lines="two"
    v-else
  >
    <v-list-item 
      v-for="friend in friendList" 
      :key="friend.id"
    >
      <template #prepend>
        <v-avatar  
          :image="friend.avatar.image"
          :color="!friend.avatar.image ? friend.avatar.color : ''"
          size="40"/>
      </template>
      <v-list-item-title>
        {{ friendStore.fullName(friend.id) }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ friend.email }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useFriendStore } from '@/stores/FriendStore';
import EmptyPageWarning from '@/components/EmptyPageWarning.vue';

// stores
const friendStore = useFriendStore();

// props
const props = defineProps({
  short: {
    type: Boolean,
    default: false
  }
})

// computed
const friendList = computed(() => {
  return friendStore[props.short ? 'getRandomFriends' : 'friends']
})

const isFriendListExists = computed(() => {
  return friendStore.friends?.length
})
</script>
