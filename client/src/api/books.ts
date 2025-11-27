import api from "../lib/axios";
import type { Book } from "../types/book";

export const getBooks = async (): Promise<Book[]> => {
  const { data } = await api.get("/api/books");
  return data.books; 
};

export const getBookById = async (id: string): Promise<Book> => {
  const { data } = await api.get(`/api/books/${id}`);
  return data.book; 
};

export const addBook = async (bookData: FormData): Promise<Book> => {
  const { data } = await api.post("/api/books", bookData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.book; 
};

export const deleteBook = async (id: string) => {
  const { data } = await api.delete(`/api/books/${id}`);
  return data;
};


