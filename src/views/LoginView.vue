<script setup lang="ts">
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

const googleAuthProvider = new GoogleAuthProvider()

const router = useRouter()
const auth = useFirebaseAuth()
const error = ref(null)

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
  if (!auth) {
    console.error('Firebase Auth instance is not available.')
    return
  }
  error.value = null
  signInWithEmailAndPassword(auth, values.email, values.password)
    .then(() => {
      console.log('User signed in successfully')
      toast.success('Sesión iniciada con éxito')
      router.push({ name: 'contacts' })
    })
    .catch((error) => {
      console.error('Error signing in:', { error })
      toast.error('Error al iniciar sesión')
      error.value = error.message
    })
})

const signinPopup = () => {
  if (!auth) {
    console.error('Firebase Auth instance is not available.')
    return
  }
  error.value = null
  signInWithPopup(auth, googleAuthProvider)
    .then(() => {
      console.log('User signed in successfully')
      toast.success('Sesión iniciada con éxito')
      router.push({ name: 'contacts' })
    })
    .catch((error) => {
      console.error('Error signing in:', { error })
      toast.error('Error al iniciar sesión')
      error.value = error.message
    })
}
</script>

<template>
  <div class="w-[380px] m-auto min-h-screen flex justify-center items-center">
    <Card class="w-full">
      <CardContent class="space-y-6">
        <div class="w-full text-center">
          <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">
            Iniciar sesión en Bindeo
          </h1>
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

          <Button class="w-full cursor-pointer" type="submit" :disabled="!form.meta.value.valid">
            Iniciar sesión con email
          </Button>
        </form>

        <div class="text-sm text-muted-foreground w-full">
          <p class="text-left">
            ¿No tienes una cuenta?
            <RouterLink to="/register" class="w-full underline">Crear cuenta</RouterLink>
          </p>
        </div>

        <Separator label="O CONTINUA CON" />

        <Button class="w-full cursor-pointer" variant="outline" type="submit" @click="signinPopup">
          <Icon icon="mdi:google-plus" width="20" height="20"></Icon>
          Gmail
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
