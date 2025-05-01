import type { FolderItem } from "@/types";
import { defineStore } from "pinia";

export const useFolderStore = defineStore("folder", {
  state: () => ({
    rootFolders: [] as FolderItem[],
    selectedFolder: null as FolderItem | null,
    folderStack: [] as FolderItem[],
  }),
  actions: {
    setRootFolders(folders: FolderItem[]) {
      this.rootFolders = folders;
      this.folderStack = [];
      this.selectedFolder = null;
    },
    selectFolder(folder: FolderItem) {
      // Cari jika folder sudah ada dalam stack
      // const existingIndex = this.folderStack.findIndex(
      //   (f) => f.name === folder.name
      // );

      // if (existingIndex !== -1) {
      //   // Jika sudah ada, potong stack sampai folder yang dipilih
      //   this.folderStack = this.folderStack.slice(0, existingIndex + 1);
      // } else {
      //   // Jika folder baru, push ke stack
      // this.folderStack.push(folder);
      // }

      this.selectedFolder = folder;
    },
    goBack() {
      if (this.folderStack.length > 1) {
        this.folderStack.pop();
        this.selectedFolder = this.folderStack[this.folderStack.length - 1];
      }
    },
  },
});
