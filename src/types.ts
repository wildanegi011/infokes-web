export type FolderItem = {
  id: number;
  name: string;
  type: string;
  children?: FolderItem[];
};
