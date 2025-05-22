<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export interface Props {
  avatarUrl?: string | null
  name?: string
  email?: string
}
const props = defineProps<Props>()

const emits = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="flex gap-4 items-center justify-start rounded-md border px-4 py-2">
    <Avatar>
      <AvatarImage v-if="props.avatarUrl" :src="props.avatarUrl" :alt="props.name" />
      <AvatarFallback v-else>
        <Icon icon="mdi:account" width="20" height="20" />
      </AvatarFallback>
    </Avatar>
    <div>
      <Label class="text-center text-lg font-semibold">
        {{ props.name || 'Nombre de contacto' }}
      </Label>
      <Label class="text-center text-sm text-muted-foreground">
        {{ props.email || 'Correo electrónico' }}
      </Label>
    </div>
    <div class="flex gap-2 ml-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="icon">
              <Icon icon="mdi:pencil-outline" width="20" height="20"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="icon" @click="emits('delete')">
              <Icon icon="mdi:trash-outline" width="20" height="20"></Icon>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
