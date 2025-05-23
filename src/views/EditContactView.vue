<script setup lang="ts">
import { shallowRef, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCurrentUser, useDocument } from 'vuefire'
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { updateDoc, doc } from 'firebase/firestore'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { db } from '@/firebase'

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()
const isLoadingEditContact = shallowRef(false)
const formSchema = toTypedSchema(
  z.object({
    photo: z.string().optional(),
    name: z.string().min(1, 'Nombre es requerido').max(200),
    email: z.string().email('Email no válido').min(6).max(150),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const contactSource = computed(() =>
  user.value?.uid ? doc(db, 'users', user.value.uid, 'contacts', String(route.params.id)) : null,
)

const contact = useDocument(contactSource)

const onSubmit = form.handleSubmit(async (values) => {
  if (!user.value?.uid) return
  try {
    isLoadingEditContact.value = true
    await updateDoc(doc(db, 'users', user.value.uid, 'contacts', String(route.params.id)), {
      name: values.name,
      email: values.email,
      createdAt: new Date(),
    }).then(() => {
      form.resetForm()
      toast.success('Contacto actualizado con éxito')
      router.push({ name: 'contacts' })
    })
  } catch (e) {
    console.error('Error creating contact:', e)
    toast.error('Error al actualizar el contacto')
  } finally {
    isLoadingEditContact.value = false
  }
})

watch(contact, (newContact) => {
  if (newContact) {
    form.setValues({
      photo: newContact.photo,
      name: newContact.name,
      email: newContact.email,
    })
  }
})
</script>

<template>
  <div class="max-w-[920px] mx-auto mt-4">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Editar contacto</h1>
    </div>
    <form @submit="onSubmit" class="space-y-4">
      <FormField name="name" v-slot="{ field }">
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input v-bind="field" type="text" placeholder="Nombre del contacto" />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="email" v-slot="{ field }">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input v-bind="field" type="email" placeholder="Email del contacto" />
          </FormControl>
        </FormItem>
      </FormField>

      <div class="flex items-center justify-end gap-2 md:flex-row">
        <Button
          variant="secondary"
          class="w-full flex-1/2 md:w-32 md:flex-initial"
          :disabled="isLoadingEditContact"
          @click="router.push({ name: 'contacts' })"
        >
          Cancelar
        </Button>

        <Button
          :disabled="!form.meta.value.valid || isLoadingEditContact"
          class="w-full flex-1/2 md:w-32 md:flex-initial"
        >
          Actualizar
        </Button>
      </div>
    </form>
  </div>
</template>
