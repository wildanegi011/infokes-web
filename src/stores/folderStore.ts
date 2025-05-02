import type { FolderItem } from "@/types";
import axios from "axios";
import { defineStore } from "pinia";

export const useFolderStore = defineStore("folder", {
  state: () => ({
    selectedFolder: null as FolderItem | null,
    folderStack: [] as FolderItem[],
    folders: [] as FolderItem[], // Global folder tree
  }),
  actions: {
    selectFolder(folder: FolderItem) {
      this.selectedFolder = folder;
    },
    goBack() {
      if (this.folderStack.length > 1) {
        this.folderStack.pop();
        this.selectedFolder = this.folderStack[this.folderStack.length - 1];
      }
    },
    selectFolderById(id: number) {
      const findFolder = (folders: any[]): any => {
        for (const folder of folders) {
          if (folder.id === id) return folder;
          if (folder.children) {
            const result = findFolder(folder.children);
            if (result) return result;
          }
        }
        return null;
      };

      const target = findFolder(this.folders);
      if (target) this.selectFolder(target);
    },
    async fetchFolders() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/folder`
        );
        this.folders = response.data.data;
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    },
  },
});
