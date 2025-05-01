<script setup lang="ts">
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarTrigger
} from '@/components/ui/sidebar'
import { useFolderStore } from '@/stores/folderStore'
import { File, Folder } from 'lucide-vue-next'


const store = useFolderStore()

</script>
<template>
    <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div class="flex items-center gap-2 px-4">
                <SidebarTrigger class="-ml-1 cursor-pointer" />
                <Separator orientation="vertical" class="mr-2 h-4" />
                <!-- <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem v-for="(folder, index) in store.folderStack" :key="index">
                            <BreadcrumbLink @click.prevent="store.selectFolder(folder)">
                            {{ folder.name }}
                            </BreadcrumbLink>
                            <BreadcrumbSeparator v-if="index < store.folderStack.length - 1" />
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>  -->
            </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div v-if="store.selectedFolder">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <div
                        v-for="(child, index) in store.selectedFolder.children || []"
                        :key="index"
                        class="flex flex-col items-center justify-center p-4 border rounded hover:bg-gray-100 transition"
                        @click="child.type === 'folder' && store.selectFolder(child)"
                    >
                        <Folder v-if="child.type === 'folder'" class="size-10 mb-2" />
                        <File v-else class="size-10 mb-2" />
                        <span class="text-xs text-center break-words">{{ child.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </SidebarInset>
</template>
