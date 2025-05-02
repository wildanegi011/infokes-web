<script setup lang="ts">
import Tree from '@/components/Tree.vue'

import { 
    Sidebar,
    SidebarMenu,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarContent,

} from '@/components/ui/sidebar'
import {
    Dialog, 
    DialogTrigger
} from '@/components/ui/dialog';

import SidebarGroupContent from './ui/sidebar/SidebarGroupContent.vue';

import { Plus } from 'lucide-vue-next'
import { onMounted } from 'vue';
import { useFolderStore } from '@/stores/folderStore';
import { useFolderActions } from '@/actions/useFolderActions';

const folderStore = useFolderStore();

const { handleCreate } = useFolderActions()

onMounted(() => {
    folderStore.fetchFolders()
});

</script>

<template>
    <Sidebar collapsible="icon">
        <SidebarContent>
            <SidebarGroup class="mt-2">
                <SidebarGroupLabel>Files</SidebarGroupLabel>
                    <Dialog>
                        <DialogTrigger as-child>
                            <SidebarGroupAction title="Add Folder" class="cursor-pointer" @click="handleCreate('folder')">
                                <Plus class="!size-4" /> <span class="sr-only">Add Folder</span>
                            </SidebarGroupAction>
                        </DialogTrigger>
                    </Dialog>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <Tree 
                            v-for="(folder, index) in folderStore.folders" 
                            :key="index" 
                            :folder="folder" 
                        />
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

        </SidebarContent>
    </Sidebar>
</template>