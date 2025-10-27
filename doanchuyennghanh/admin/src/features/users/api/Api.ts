import axios from "axios";
import type { User } from "../index";

const API_BASE_URL = "http://localhost:3000/api/v1/admin/users";

export const get = async () => {
  const res = await axios.get(`${API_BASE_URL}/getall`);
  return res.data; // trả về { data: [...] }
};

export const create = async (userData: Omit<User, 'id'>) => {
  const res = await axios.post(`${API_BASE_URL}/create`, userData);
  return res.data;
};

export const update = async (id: string, userData: Partial<User>) => {
  const res = await axios.put(`${API_BASE_URL}/update/${id}`, userData);
  return res.data;
};

export const deleteId = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/delete/${id}`);
  return res.data;
};