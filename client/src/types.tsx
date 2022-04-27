export type resourceType = {
  _id: string;
  _title: string;
  _note: string;
  _link: string;
  _userId: string;
  _createdAt: string;
  _categories: categoryType[];
};

export type categoryType = { _id: string; _name: string };
