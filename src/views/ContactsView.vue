<script setup lang="ts">
import { useRouter } from 'vue-router'
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
import { Button } from '@/components/ui/button'

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
  <div class="flex items-center justify-end max-w-[920px] mx-auto mt-4">
    <div v-if="user">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div class="flex items-center space-x-2">
            <h2 class="text-sm font-semibold">
              {{ user?.displayName || user?.email || 'Usuario' }}
            </h2>
            <Avatar>
              <AvatarImage
                v-if="user?.photoURL"
                :src="user?.photoURL"
                :alt="user?.displayName || user?.email || 'Usuario'"
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
    <div class="flex items-center justify-between mt-4">
      <div>
        <h1 class="text-2xl font-bold">Contactos</h1>
        <p class="text-sm text-muted-foreground">Lista de contactos</p>
      </div>
      <router-link to="/create-contact">
        <Button variant="ghost">
          <Icon icon="mdi:plus" width="20" height="20" />
          Crear nuevo contacto
        </Button>
      </router-link>
    </div>
    <ContactItem></ContactItem>
  </div>
</template>
