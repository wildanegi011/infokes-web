import { defineStore } from "pinia";
import { markRaw } from "vue";

export const useDialogStore = defineStore("dialog", {
  state: () => ({
    isOpen: false,
    title: "",
    description: "",
    formSchema: null as any,
    onSubmit: null as ((values?: any) => void) | null,
    formSlot: null as any,
  }),
  actions: {
    openDialog({ title, description, formSchema, onSubmit, formSlot }: any) {
      this.isOpen = true;
      this.title = title;
      this.description = description;
      this.formSchema = formSchema ? formSchema : null;
      this.onSubmit = onSubmit;
      this.formSlot = formSlot ? markRaw(formSlot) : null;
    },
    closeDialog() {
      this.isOpen = false;
      this.title = "";
      this.description = "";
      this.formSchema = null;
      this.onSubmit = null;
      this.formSlot = null;
    },
  },
});
