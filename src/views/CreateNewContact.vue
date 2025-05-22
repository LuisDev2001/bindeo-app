<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ContactItem from '@/components/ContactItem.vue'

const router = useRouter()
const photoPreview = ref<string | null>(null)
const formSchema = toTypedSchema(
  z.object({
    photo: z.instanceof(File).optional(),
    name: z.string().min(1, 'Nombre es requerido').max(200),
    email: z.string().email('Email no válido').min(6).max(150),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  // Aquí puedes agregar la lógica para crear un nuevo contacto
  console.log('Nuevo contacto creado:', values)
})

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    form.setFieldValue('photo', file)
    photoPreview.value = URL.createObjectURL(file)
  } else {
    form.setFieldValue('photo', undefined)
    photoPreview.value = null
  }
}
</script>

<template>
  <div class="max-w-[920px] mx-auto mt-4">
    <h1 class="text-2xl font-bold mb-4">Crear nuevo contacto</h1>
    <form @submit="onSubmit" class="space-y-4">
      <FormField name="photo">
        <FormItem>
          <FormLabel>Foto</FormLabel>
          <FormControl>
            <Input type="file" @change="handleFileChange" />
          </FormControl>
        </FormItem>
      </FormField>

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

      <div v-if="form.meta.value.valid" class="grid gap-2">
        <p class="text-sm font-medium leading-none">Vista previa del contacto:</p>
        <ContactItem
          is-preview
          :avatar-url="photoPreview"
          :name="form.values.name"
          :email="form.values.email"
        />
      </div>

      <Button type="submit" :disabled="!form.meta.value.valid" class="w-full">
        Crear contacto
      </Button>
    </form>
  </div>
</template>
