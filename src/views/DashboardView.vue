<template>
  <v-sheet 
    class="bg-transparent" 
    width="100%"
    height="100%"
  >
    <v-container>
      <v-row>
        <v-col>
          <v-card
            class="mx-auto mb-4"
            max-width="400"
            elevation="10"
          >
            <v-img
              class="align-end text-white"
              height="200"
              :src="tripStore.closestTrip?.avatar.image"
              cover
            >
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              Number 10
            </v-card-subtitle>

            <v-card-text>
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange">
                Share
              </v-btn>

              <v-btn color="orange">
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
          <TripList/>
        </v-col>
        <v-col>
          <FriendList/>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>

  </v-sheet>
</template>

<script setup>
import TripList from '@/components/TripList.vue';
import FriendList from '@/components/FriendList.vue';
import {useTripStore}
</script>
