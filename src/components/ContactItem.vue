<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <div class="flex gap-4 items-center justify-start rounded-md border px-4 py-2">
    <Avatar>
      <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div>
      <Label class="text-center text-lg font-semibold">John Doe</Label>
      <Label class="text-center text-sm text-muted-foreground"> example@example.com </Label>
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
            <Button variant="outline" size="icon">
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
