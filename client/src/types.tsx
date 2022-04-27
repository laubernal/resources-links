export type resourceType = {
  id: string;
  title: string;
  note: string;
  link: string;
  userId: string;
  createdAt: string;
  categories: categoryType[];
};

export type categoryType = { id: string; name: string };
