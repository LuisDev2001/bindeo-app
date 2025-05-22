<script setup lang="ts">
import ContactItem from '@/components/ContactItem.vue'
import { Icon } from '@iconify/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <div class="flex items-center justify-between max-w-[920px] mx-auto mt-4">
    <div>
      <h1 class="text-2xl font-bold">Contactos</h1>
      <p class="text-sm text-muted-foreground">Lista de contactos</p>
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div class="flex items-center space-x-2">
            <h2 class="text-sm font-semibold">@unovue</h2>
            <Avatar>
              <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem>
            <Icon icon="mdi:logout" width="20" height="20" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
  <div class="grid grid-cols-1 items-start gap-4 mt-4 max-w-[920px] mx-auto">
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
    <ContactItem></ContactItem>
  </div>
</template>
