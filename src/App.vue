<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <Toaster position="top-right" />
  <div class="px-4">
    <RouterView />
  </div>
</template>
