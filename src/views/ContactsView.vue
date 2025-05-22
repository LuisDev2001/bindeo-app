<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useCurrentUser, useFirebaseAuth, useCollection } from 'vuefire'
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
import UserSkeleton from '@/components/skeletons/UserSkeleton.vue'
import ContactItemSkeleton from '@/components/skeletons/ContactItemSkeleton.vue'

const user = useCurrentUser()
const auth = useFirebaseAuth()
const router = useRouter()

const contactSource = computed(() => {
  if (!user.value?.uid) return null
  return collection(db, 'users', user.value.uid, 'contacts')
})

const { data: contactList, pending: contactListPending } = useCollection(contactSource)

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

const handleDeleteContact = async (contactId: string) => {
  if (!user.value?.uid) return
  try {
    await deleteDoc(doc(db, 'users', user.value.uid, 'contacts', contactId))
  } catch (e) {
    console.error('Error deleting contact:', e)
  }
}
</script>

<template>
  <div class="flex items-center justify-end max-w-[920px] mx-auto mt-4">
    <UserSkeleton v-if="!user?.uid" />
    <DropdownMenu v-else>
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

    <div v-if="!user?.uid || contactListPending" class="text-center">
      <ContactItemSkeleton></ContactItemSkeleton>
    </div>
    <template v-else>
      <template v-if="contactList.length">
        <ContactItem
          v-for="contact in contactList"
          :key="contact.id"
          :email="contact.email"
          :name="contact.name"
          :avatarUrl="contact.photo"
          @delete="handleDeleteContact(contact.id)"
        />
      </template>
      <div v-else class="text-center p-4 bg-background border rounded-md">
        <Icon icon="mdi:delete-empty" width="40" height="40" class="mx-auto mb-2 text-primary" />
        <p class="text-sm text-muted-foreground">No hay contactos disponibles</p>
        <p class="text-sm text-muted-foreground">
          Agrega un nuevo contacto haciendo clic en el botón de arriba.
        </p>
      </div>
    </template>
  </div>
</template>
