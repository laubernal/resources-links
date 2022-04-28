export type resourceType = {
  id: string;
  title: string;
  link: string;
  note: string;
  createdAt: string;
  categories: categoryType[];
};

export type categoryType = { id: string; name: string };
