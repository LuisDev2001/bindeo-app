<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
const router = useRouter()
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-background">
    <Card class="w-full max-w-sm">
      <CardContent>
        <div class="flex flex-col items-center justify-center space-y-4">
          <h1 class="text-2xl font-bold">404 - Not Found</h1>
          <p class="text-gray-500">La página que estás buscando no existe.</p>
          <Button @click="router.push('/')"> Regresar a la página principal </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
