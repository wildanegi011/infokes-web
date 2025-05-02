import AddForm from "@/components/AddForm.vue";
import { useDialogStore } from "@/stores/dialogStore";
import { useFolderStore } from "@/stores/folderStore";
import { toTypedSchema } from "@vee-validate/zod";
import axios from "axios";
import { toast } from "vue-sonner";
import { z } from "zod";

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
          await folderStore.fetchFolders();
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
          await folderStore.fetchFolders();

          const last = folderStore.folderStack.pop();
          if (last) {
            folderStore.selectFolderById(last.id); // pastikan kamu punya method ini
          } else {
            folderStore.selectedFolder = null;
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
