import { useDialogStore } from "@/stores/dialogStore";
import { useFolderStore } from "@/stores/folderStore";
import axios from "axios";
import { toast } from "vue-sonner";

export const useDeleteActions = () => {
  const folderStore = useFolderStore();

  const handleDelete = (type: "file" | "folder", parentId?: number) => {
    const dialog = useDialogStore();
    dialog.openDialog({
      title: `Delete ${type === "file" ? "File" : "Folder"}`,
      description: `Are you sure delete this ${type}??`,
      onSubmit: async (values: any) => {
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/folder`, {
            ...values,
            type,
            parentId,
          });
          toast.success(`${type} deleted successfully!`);
          folderStore.fetchFolders();
        } catch (error) {
          toast.error(`Failed to delete ${type}.`);
        } finally {
          dialog.closeDialog();
        }
      },
    });
  };

  return {
    handleDelete,
  };
};
