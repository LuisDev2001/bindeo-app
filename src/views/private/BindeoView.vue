<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
import HeaderApp from '@/components/HeaderApp.vue'
const user = useCurrentUser()
</script>

<template>
  <div>
    <HeaderApp
      v-if="user"
      :name="user.displayName || user.email"
      :email="user.email"
      :photoURL="user?.photoURL"
    />
    <RouterView />
  </div>
</template>
