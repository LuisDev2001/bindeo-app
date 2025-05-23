<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useCurrentUser, useCollection } from 'vuefire'
import { Icon } from '@iconify/vue'
import ContactItem from '@/components/ContactItem.vue'
import { Button } from '@/components/ui/button'
import ContactItemSkeleton from '@/components/skeletons/ContactItemSkeleton.vue'

const user = useCurrentUser()
const router = useRouter()

const contactSource = computed(() => {
  if (!user.value?.uid) return null
  return collection(db, 'users', user.value.uid, 'contacts')
})

const { data: contactList, pending: contactListPending } = useCollection(contactSource)

const handleDeleteContact = async (contactId: string) => {
  if (!user.value?.uid) return
  try {
    await deleteDoc(doc(db, 'users', user.value.uid, 'contacts', contactId)).then(() => {
      toast.success('Contacto eliminado con éxito')
    })
  } catch (e) {
    console.error('Error deleting contact:', e)
    toast.error('Error al eliminar el contacto')
  }
}
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 mt-4 max-w-[920px] mx-auto">
    <div class="flex flex-col items-center justify-between mt-4 md:flex-row">
      <div class="mb-4">
        <h1 class="text-2xl font-bold">Contactos</h1>
        <p class="text-sm text-muted-foreground">Lista de contactos</p>
      </div>
      <router-link :to="{ name: 'create-contact' }" class="w-full md:w-auto">
        <Button variant="outline" class="w-full md:w-auto">
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
          @edit="router.push({ name: 'edit-contact', params: { id: contact.id } })"
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
