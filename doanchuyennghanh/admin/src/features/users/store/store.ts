import { defineStore } from "pinia";
import { ref } from "vue";
import {
  get as getUsers,
  create as createApiUser,
  update as updateApiUser,
  deleteId as deleteApiUser,
} from "../api/Api";
import type { User } from "../index";

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getUsers();
      users.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch users.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (userData: User) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await createApiUser(userData);
      users.value.push(response.data);
    } catch (err) {
      error.value = "Failed to create user.";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id: string, userData: User) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await updateApiUser(id, userData);
      const index = users.value.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.value[index] = response.data;
      }
    } catch (err) {
      error.value = "Failed to update user.";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await deleteApiUser(id);
      users.value = users.value.filter((user) => user.id !== id);
    } catch (err) {
      error.value = "Failed to delete user.";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
});