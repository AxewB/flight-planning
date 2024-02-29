<template>
  <v-layout>
    <v-navigation-drawer>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          subtitle="sandra_a88@gmailcom"
          title="Sandra Adams"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list 
        nav 
        density="compact">
        <v-list-item 
          prepend-icon="mdi-home" 
          title="Dashboard" 
          value="myfiles"></v-list-item>
        <v-list-item 
          prepend-icon="mdi-account-multiple" 
          title="Friends" 
          value="shared"></v-list-item>
        <v-list-item 
          prepend-icon="mdi-calendar" 
          title="Calendar" 
          value="calendar"></v-list-item>
        <VDivider/>
        <v-list-subheader>
          Trips
          <button icon="mdi-plus"></button>
        </v-list-subheader>
        <v-list-item 
          prepend-icon="mdi-square-rounded" 
          title="Trip 1" 
          value="trip1"></v-list-item>
        <v-list-item 
          prepend-icon="mdi-square-rounded" 
          title="Trip 2" 
          value="trip2"></v-list-item>
        <v-list-item 
          prepend-icon="mdi-square-rounded" 
          title="Trip 3" 
          value="trip3"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar title="something">
      <v-sheet class="bg-transparent mr-5">
        
        <v-btn 
          icon
          @click="toggleFullWidth()">
          <VIcon icon="mdi-arrow-expand-horizontal"/>
          <VTooltip 
            activator="parent" 
            text="toggle full width"
            location="bottom"/>
        </v-btn>
        <v-btn icon>
          <VIcon icon="mdi-cog"/>
          <VTooltip 
            activator="parent" 
            text="settings"
            location="bottom"/>
          <v-menu activator="parent">
            <v-sheet>
              <v-list nav>
                <v-list-item 
                  prepend-icon="mdi-home" 
                  title="Dashboard" 
                  value="myfiles"></v-list-item>
                <v-list-item 
                  prepend-icon="mdi-account-multiple" 
                  title="Friends" 
                  value="shared"></v-list-item>
                <v-list-item 
                  prepend-icon="mdi-calendar" 
                  title="Calendar" 
                  value="calendar"></v-list-item>
              </v-list>
            </v-sheet>
          </v-menu>
        </v-btn>
      </v-sheet>
    </v-app-bar>
    <v-main class="d-flex flex-column align-center bg-transparent">  
      <v-sheet 
        class="bg-transparent d-flex flex-column pa-5"
        :width="pageSettings.fullWidth ? '100%' : '1200px'">
        <v-sheet 
          class="d-flex flex-row pa-5" 
          rounded>
          <v-avatar 
            class="mr-5"
            size="160" 
            color="surface-variant" 
            rounded>
            <v-img src="https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQvvk1u5MPIg8tPgVIz79anFhHvxTTABJNWvEnPAuYkZo0TInztqQHCv1R6DOh48cBW"></v-img>
          </v-avatar>
          <v-sheet class="bg-transparent flex-grow-1 d-flex flex-column">
            <v-sheet class="bg-transparent d-flex justify-space-between">
              <div class="text-h3 mb-5">Title</div>
              <v-sheet>
                <v-btn 
                  icon
                  class="mx-2"
                  elevation="0">
                  <VIcon icon="mdi-image-remove"/>
                  <VTooltip 
                    activator="parent" 
                    text="remove picture"
                    location="bottom"/>
                </v-btn>
                <v-btn 
                  icon
                  class="mx-2"
                  elevation="0">
                  <VIcon icon="mdi-trash-can"/>
                  <VTooltip 
                    activator="parent" 
                    text="delete this trip (w/ confirmation)"
                    location="bottom"/>
                </v-btn>
                <v-btn 
                  icon
                  class="mx-2"
                  elevation="0">
                  <VIcon icon="mdi-content-copy"/>
                  <VTooltip 
                    activator="parent" 
                    text="copy this trip (w/ confirmation)"
                    location="bottom"/>
                </v-btn>
              </v-sheet>
            </v-sheet>
            <div>Description</div>
          </v-sheet>
          <v-sheet class="bg-transparent d-flex flex-column fill-height">
            
          </v-sheet>
        </v-sheet>
        <VDivider class="my-4"/>
        <v-sheet class="d-flex flex-column">
          <v-sheet class="bg-transparent d-flex mb-4">
            <v-text-field 
              class="mx-2"
              variant="solo-filled" 
              label="begin date"
              hide-details></v-text-field>
            <v-text-field 
              class="mx-2"
              variant="solo-filled" 
              label="end date"
              hide-details></v-text-field>
          </v-sheet>
          
        </v-sheet>
        <v-sheet class="d-flex flex-column">
          <v-sheet class="bg-transparent d-flex">
            <v-text-field 
              class="mx-2"
              variant="solo-filled" 
              label="budget"
              hide-details></v-text-field>
            <v-text-field 
              class="mx-2"
              variant="solo-filled" 
              label=""
              hide-details></v-text-field>
            <v-text-field 
              class="mx-2"
              variant="solo-filled" 
              label="end date"
              hide-details></v-text-field>
          </v-sheet>
        </v-sheet>
        <VDivider class="my-4"/>
        <v-sheet 
          class="d-flex flex-row" 
          width="100%">
          <v-sheet class="flex-grow-1">
            <v-sheet 
              class="bg-transparent 
                    text-h4 
                    mb-2 
                    d-flex 
                    justify-space-between">
              Trip plan
              <v-sheet class="bg-transparent">
                <v-btn color="primary">ADD TASK</v-btn>
              </v-sheet>
            </v-sheet>
            
            
            <v-btn
              v-for="(item,itemIndex) in [0,1,2,3,4]" 
              class="mb-2 d-flex flex-row justify-space-between"
              :key="item"
              variant="flat"
              size="large" 
              width="100%">
              <template  #default >
                <VIcon icon="mdi-menu"></VIcon>
                <VDivider 
                  thickness="2" 
                  class="mx-2" 
                  vertical/>
                {{ getShortDate }}
                <VDivider 
                  thickness="2" 
                  class="mx-2" 
                  vertical/>
                DAY {{ itemIndex + 1 }}
                <VDivider 
                  thickness="2" 
                  class="mx-2" 
                  vertical/>
                Trip todo {{ itemIndex }}
              </template>
              
              
            </v-btn>
          </v-sheet>
          <VDivider 
            vertical 
            class="mx-2"/>
          <v-sheet>
            <VTextarea 
              width="400px" 
              height="800px" 
              label="Notes" 
              variant="solo-filled" 
              counter
              prepend-inner-icon="mdi-comment"
              rows="12"/>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref, computed } from 'vue';
const date_begin = ref(new Date());
const pageSettings = ref({
  fullWidth: true,
})

const toggleFullWidth = () => {
  pageSettings.value.fullWidth = !pageSettings.value.fullWidth
}

const getShortDate = computed(() => {
  const day = date_begin.value.getDate();
  const month = date_begin.value.getMonth();
  const year = date_begin.value.getFullYear();
  return day + '/' + month + "/" + year;
})
</script>