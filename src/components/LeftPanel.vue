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
import AddFolderForm from './AddFolderForm.vue';
import { useDialogStore } from '@/stores/dialogStore';

import { Plus } from 'lucide-vue-next'
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const formSchema = toTypedSchema(z.object({
    name: z.string({
        required_error: "Name is required"
    }),
}))

const openAddFolderDialog = () => {
    const dialog = useDialogStore()
    dialog.openDialog({
    title: 'Add New Folder',
    description: 'Make new folder to your project, Click save when you\'re done',
    formSchema,
    onSubmit: (values: any) => {
      console.log('submitted', values)
      dialog.closeDialog()
    },
    formSlot: AddFolderForm,
  })
}

const folders = ref<any[]>([])

const fecthFolders = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/folder`);
        folders.value = response.data.data;
        
    } catch (error) {
        console.error('Error fetching folder items:', error);
        
    }
}

onMounted(() => {
    fecthFolders();
});

</script>

<template>
    <Sidebar collapsible="icon">
        <SidebarContent>
            <SidebarGroup class="mt-2">
                <SidebarGroupLabel>Files</SidebarGroupLabel>
                    <Dialog>
                        <DialogTrigger as-child>
                            <SidebarGroupAction title="Add Folder" class="cursor-pointer" @click="openAddFolderDialog">
                                <Plus class="!size-4" /> <span class="sr-only">Add Folder</span>
                            </SidebarGroupAction>
                        </DialogTrigger>
                    </Dialog>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <Tree 
                            v-for="(folder, index) in folders" 
                            :key="index" 
                            :folder="folder" 
                        />
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

        </SidebarContent>
    </Sidebar>
</template>