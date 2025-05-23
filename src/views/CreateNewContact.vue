<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { toast } from 'vue-sonner'
import { useForm } from 'vee-validate'
import { collection, addDoc } from 'firebase/firestore'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { db } from '@/firebase'

const router = useRouter()
const user = useCurrentUser()
const isLoadingCreateContact = shallowRef(false)
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

const onSubmit = form.handleSubmit(async (values) => {
  if (!user.value?.uid) return
  try {
    isLoadingCreateContact.value = true
    const randomId = Math.floor(Math.random() * 99) + 1
    const randomPhoto = `https://randomuser.me/api/portraits/men/${randomId}.jpg`
    await addDoc(collection(db, 'users', user.value.uid, 'contacts'), {
      photo: randomPhoto,
      name: values.name,
      email: values.email,
      createdAt: new Date(),
    }).then(() => {
      form.resetForm()
      toast.success('Contacto creado con éxito')
      router.push({ name: 'contacts' })
    })
  } catch (e) {
    console.error('Error creating contact:', e)
    toast.error('Error al crear el contacto')
  } finally {
    isLoadingCreateContact.value = false
  }
})
</script>

<template>
  <div class="max-w-[920px] mx-auto mt-4">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">Crear nuevo contacto</h1>
      <p class="text-sm text-muted-foreground">
        Completa el formulario para crear un nuevo contacto.
      </p>
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
          :disabled="isLoadingCreateContact"
          @click="router.push({ name: 'contacts' })"
        >
          Cancelar
        </Button>

        <Button
          :disabled="!form.meta.value.valid || isLoadingCreateContact"
          class="w-full flex-1/2 md:w-32 md:flex-initial"
        >
          Crear contacto
        </Button>
      </div>
    </form>
  </div>
</template>
