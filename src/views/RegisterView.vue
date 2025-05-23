<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'

const auth = useFirebaseAuth()
const router = useRouter()
const isLoadingCreateAccount = shallowRef(false)

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email('Email no válido').min(6).max(20),
      password: z.string().min(6).max(8),
      passwordConfirmation: z.string().min(6).max(8),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Las contraseñas no coinciden',
      path: ['passwordConfirmation'],
    }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  if (!auth) {
    console.error('Firebase Auth instance is not available.')
    return
  }
  isLoadingCreateAccount.value = true
  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(() => {
      console.log('User created successfully')
      toast.success('Cuenta creada con éxito')
      router.push({ path: '/contacts' })
    })
    .catch((error) => {
      console.error('Error creating user:', error)
      toast.error('Error al crear cuenta')
    })
    .finally(() => {
      isLoadingCreateAccount.value = false
    })
})
</script>

<template>
  <div class="w-[380px] m-auto min-h-screen flex justify-center items-center">
    <Card class="w-full">
      <CardHeader>
        <h2 class="text-2xl font-bold text-center">Crear cuenta</h2>
        <p class="text-sm text-muted-foreground text-center">
          Ya tienes una cuenta?
          <RouterLink to="/login" class="underline">Iniciar sesión</RouterLink>
        </p>
      </CardHeader>
      <CardContent class="space-y-6">
        <form @submit="onSubmit" class="space-y-2 w-full">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@example.com" v-bind="componentField" />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="passwordConfirmation">
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField" />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          </FormField>

          <Button
            class="w-full cursor-pointer"
            type="submit"
            :disabled="!form.meta.value.valid || isLoadingCreateAccount"
          >
            Crear cuenta
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
