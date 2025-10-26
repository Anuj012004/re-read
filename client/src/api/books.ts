import api from "../lib/axios";
import type { Book } from "../types/book";

export const getBooks = async (): Promise<Book[]> => {
  const { data } = await api.get("/books");
  return data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

export const addBook = async (bookData: FormData): Promise<Book> => {
  const { data } = await api.post("/books", bookData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteBook = async (id: string) => {
  const { data } = await api.delete(`/books/${id}`);
  return data;
};
