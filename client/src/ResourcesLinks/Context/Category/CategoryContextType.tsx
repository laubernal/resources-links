export interface CategoryContextType {
  fetchCategoryList: () => Promise<void>;
  saveCategory: (name: string) => Promise<void>;
  updateCategory: (id: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  categoriesList: { label: string; value: string }[];
}
