export interface Book {
  _id: string;
  title: string;
  author: string;
  class: string;
  semester:string;
  subject : string;
  publishYear: string;
  organization: string;
  condition: string;
  price: number;
  image?: string;
  seller: string; // userId
}
