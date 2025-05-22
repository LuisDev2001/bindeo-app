<script setup lang="ts">
import { signOut } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { Icon } from '@iconify/vue'
import ContactItem from '@/components/ContactItem.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'vue-router'

const user = useCurrentUser()
const auth = useFirebaseAuth()
const router = useRouter()

const handleSignOut = () => {
  if (!auth) {
    console.error('Firebase Auth instance is not available.')
    return
  }
  signOut(auth)
    .then(() => {
      console.log('User signed out successfully')
      router.push({ name: 'login' })
    })
    .catch((error) => {
      console.error('Error signing out:', { error })
    })
}
</script>

<template>
  <div class="flex items-center justify-between max-w-[920px] mx-auto mt-4">
    <div>
      <h1 class="text-2xl font-bold">Contactos</h1>
      <p class="text-sm text-muted-foreground">Lista de contactos</p>
    </div>
    <div v-if="user">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div class="flex items-center space-x-2">
            <h2 class="text-sm font-semibold">
              {{ user.providerData[0]?.displayName || user.providerData[0]?.email || 'Usuario' }}
            </h2>
            <Avatar>
              <AvatarImage
                v-if="user.providerData[0]?.photoURL"
                :src="user.providerData[0].photoURL"
                :alt="user.providerData[0]?.displayName || user.providerData[0]?.email || 'Usuario'"
              />
              <AvatarFallback v-else>
                <Icon icon="mdi:account" width="20" height="20" />
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem @select="handleSignOut">
            <Icon icon="mdi:logout" width="20" height="20" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
  <div class="grid grid-cols-1 items-start gap-4 mt-4 max-w-[920px] mx-auto">
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
  </div>
</template>
