<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { toast } from 'vue-sonner'
import { Icon } from '@iconify/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface Props {
  name: string | null
  email: string | null
  photoURL: string | null
}

const props = defineProps<Props>()

const auth = useFirebaseAuth()
const router = useRouter()

const handleSignOut = () => {
  if (!auth) {
    console.error('Firebase Auth instance is not available.')
    return
  }
  auth
    .signOut()
    .then(() => {
      console.log('User signed out successfully')
      toast.success('Sesión cerrada con éxito')
      router.push({ name: 'login' })
    })
    .catch((error) => {
      console.error('Error signing out:', { error })
      toast.error('Error al cerrar sesión')
    })
}
</script>

<template>
  <div class="flex items-center justify-end max-w-[920px] mx-auto mt-4">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class="flex items-center space-x-2">
          <h2 class="text-sm font-semibold">
            {{ props.name || props.email || 'Usuario' }}
          </h2>
          <Avatar>
            <AvatarImage
              v-if="props?.photoURL"
              :src="props.photoURL"
              :alt="props.name || props.email || 'Usuario'"
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
</template>
