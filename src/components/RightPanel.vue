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
import type { FolderItem } from '@/types'
import { File, Folder } from 'lucide-vue-next'
import { computed, ref} from 'vue'


const store = useFolderStore()
const selectedFolder = computed<FolderItem | null>(() => store.selectedFolder)

const searchQuery = ref('')

const collectMatchingChildren = (items: FolderItem[], query: string): FolderItem[] => {
  const result: FolderItem[] = []
  for (const item of items) {
    if (item.name.toLowerCase().includes(query)) {
      result.push(item)
    }
    if (item.children) {
      result.push(...collectMatchingChildren(item.children, query))
    }
  }
  return result
}

const filteredChildren = computed(() => {
    if (!selectedFolder.value?.children) return []
    if (!searchQuery.value.trim()) return selectedFolder.value.children

    const query = searchQuery.value.toLowerCase()
    return collectMatchingChildren(selectedFolder.value.children, query)
})

</script>
<template>
    <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div class="flex items-center gap-2 px-4">
                <SidebarTrigger class="-ml-1 cursor-pointer" />
                <Separator orientation="vertical" class="mr-2 h-4" />
                   <!-- Breadcrumb Section -->
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
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search file or folder..."
                class="px-3 py-2 border rounded text-sm outline-none focus:ring"
            />
            
            <div v-if="selectedFolder">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <div
                        v-for="(child, index) in filteredChildren || []"
                        :key="index"
                        class="flex flex-col items-center justify-center p-4 border rounded hover:bg-gray-100 transition"
                        @click="child.type === 'folder' && store.selectFolder(child)"
                    >
                        <Folder v-if="child.type === 'folder'" class="size-10 mb-2" />
                        <File v-else class="size-10 mb-2" />
                        <span class="text-xs text-center break-words">{{ child.name }}</span>
                    </div>
                </div>
                <div v-if="filteredChildren.length === 0" class="text-sm text-gray-500 text-center py-4">
                    No results found.
                </div>
            </div>
        </div>
    </SidebarInset>
</template>
