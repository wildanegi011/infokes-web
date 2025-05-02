import AddForm from "@/components/AddForm.vue";
import { useDialogStore } from "@/stores/dialogStore";
import { useFolderStore } from "@/stores/folderStore";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import { z } from "zod";
import axios from "axios";

export const useFolderActions = () => {
  const dialog = useDialogStore();
  const folderStore = useFolderStore();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string({
        required_error: "Name is required",
      }),
    })
  );

  const handleCreate = (type: "file" | "folder", parentId?: number) => {
    dialog.openDialog({
      title: `Add New ${type === "file" ? "File" : "Folder"}`,
      description: `Create a new ${type}, then click save.`,
      formSchema,
      formSlot: AddForm,
      onSubmit: async (values: { name: string }) => {
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/folder`, {
            ...values,
            type,
            parentId,
          });
          toast.success(`${type} created successfully!`);
          // Simpan ID folder yang sedang dibuka sekarang
          const currentId = folderStore.selectedFolder?.id;

          // Ambil ulang semua folder
          await folderStore.fetchFolders();

          // Kalau ada folder yang sedang dibuka, cari ulang dan set kembali
          if (currentId !== undefined) {
            const updated = folderStore.findFolderById(currentId);
            if (updated) {
              folderStore.selectFolder(updated);
            }
          }
        } catch {
          toast.error(`Failed to create ${type}.`);
        } finally {
          dialog.closeDialog();
        }
      },
    });
  };

  const handleDelete = (type: "file" | "folder", id: number) => {
    dialog.openDialog({
      title: `Delete ${type === "file" ? "File" : "Folder"}`,
      description: `Are you sure you want to delete this ${type}?`,
      onSubmit: async () => {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/folder/${id}`);
          toast.success(`${type} deleted successfully!`);
          const currentSelectedId = folderStore.selectedFolder?.id;
          console.log(currentSelectedId);
          console.log(id);

          await folderStore.fetchFolders();

          // Jika folder yang dihapus adalah folder yang sedang dibuka
          if (currentSelectedId === id) {
            const fallback = folderStore.folderStack.pop();
            if (fallback) {
              folderStore.selectFolderById(fallback.id);
            } else {
              folderStore.selectedFolder = null;
            }
          } else if (currentSelectedId) {
            // Jika yang dihapus bukan selectedFolder, tetap refresh selectedFolder
            const updated = folderStore.findFolderById(currentSelectedId);
            if (updated) {
              folderStore.selectFolder(updated);
            } else {
              folderStore.selectedFolder = null;
            }
          }
        } catch {
          toast.error(`Failed to delete ${type}.`);
        } finally {
          dialog.closeDialog();
        }
      },
    });
  };

  return {
    handleCreate,
    handleDelete,
  };
};
