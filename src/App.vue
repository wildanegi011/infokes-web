<script setup lang="ts">
import Home from './pages/home/Home.vue'
import GlobaDialogForm from './components/GlobalDialog.vue'
import { Toaster } from '@/components/ui/sonner';
</script>

<template>
  <Toaster />
  <Home />
  <GlobaDialogForm /> 
</template>