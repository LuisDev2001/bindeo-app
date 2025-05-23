<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import { watch } from 'vue'

const user = useCurrentUser()
const router = useRouter()

watch(user, async (currentUser, previousUser) => {
  if (!currentUser && previousUser) {
    return router.push({ name: 'login' })
  }
})
</script>

<template>
  <Toaster position="top-right" />
  <div class="px-4">
    <RouterView />
  </div>
</template>
