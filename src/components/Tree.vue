<script setup lang="ts">
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';
import { ChevronRight, File, Folder } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Separator } from './ui/separator';
import { useFolderStore } from '@/stores/folderStore';
import type { FolderItem } from '@/types';

const props = defineProps<{folder: FolderItem}>()

const store = useFolderStore()
const isFolder = props.folder.type === 'folder'

const handleClick = () => {
    if (isFolder) store.selectFolder(props.folder)
}

</script>

<template>
    <ContextMenu>
        <ContextMenuTrigger>
            <SidebarMenuButton 
                v-if="!isFolder" 
                class="data-[active-true]:bg-transparent"
            >
                <File />
                {{ folder.name }}
            </SidebarMenuButton>

            <SidebarMenuItem v-else>
                <Collapsible class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
                    <CollapsibleTrigger as-child>
                        <SidebarMenuButton @click="handleClick">
                            <ChevronRight class="transition-transform" />
                            <Folder />
                            {{ folder.name }}
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            <Tree 
                                v-for="(child, index) in folder.children" 
                                :key="index" 
                                :folder="child" 
                            />
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarMenuItem>
        </ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem>New file...</ContextMenuItem>
            <ContextMenuItem>New folder...</ContextMenuItem>
            <Separator />
            <ContextMenuItem>Rename...</ContextMenuItem>
            <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>

</template>
