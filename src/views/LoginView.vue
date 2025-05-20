<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Email no válido').min(6).max(20),
    password: z.string().min(6).max(8),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <div class="w-80 m-auto min-h-screen flex flex-col justify-center items-center gap-6">
    <div class="w-full text-center">
      <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">Iniciar sesión en Bindeo</h1>
      <p class="text-sm text-muted-foreground">
        Bienvenido de nuevo. Inicia sesión para continuar con tu cuenta de Bindeo.
      </p>
    </div>
    <form @submit="onSubmit" class="space-y-2 w-full">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Correo electrónico</FormLabel>
          <FormControl>
            <Input type="email" placeholder="example@example.com" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Contraseña</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>

      <Button class="w-full cursor-pointer" type="submit"> Iniciar sesión con email </Button>
    </form>

    <Separator label="O CONTINUA CON" />

    <Button class="w-full cursor-pointer" variant="outline" type="submit">
      <Icon icon="mdi:google-plus" width="20" height="20"></Icon>
      Gmail
    </Button>
  </div>
</template>
