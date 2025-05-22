<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="flex items-center space-x-4">
    <div class="space-y-2">
      <Skeleton class="h-4 w-[120px]" />
    </div>
    <Skeleton class="h-8 w-8 rounded-full" />
  </div>
</template>
