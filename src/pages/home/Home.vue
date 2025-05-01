<script setup lang="ts">

import { provide, ref } from 'vue'

import { SidebarProvider } from '@/components/ui/sidebar'

import LeftPanel from '@/components/LeftPanel.vue'
import RightPanel from '@/components/RightPanel.vue'

// const selectedPath = ref<string[]>([])
// const setSelectedPath = (path: string[]) => {
//     selectedPath.value = path
// }

// provide("selectedPath", selectedPath)
// provide("setSelectedPath", setSelectedPath)

</script>

<template>
    <SidebarProvider>
        <LeftPanel />
        <RightPanel />
    </SidebarProvider>
</template>