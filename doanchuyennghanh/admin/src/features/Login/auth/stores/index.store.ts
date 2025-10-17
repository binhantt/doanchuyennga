import { defineStore } from "pinia";
import { authApi } from "../api/authApi";
import type { LoginRequest, LoginResponse } from "../types/interface";
import { toast } from "vue3-toastify";

interface AuthState {
  token: string | null;
  user: LoginResponse["admin"] | null; // "admin" hoặc "user" tùy backend trả về
  isLoading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("admin_token"),
    user: null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(data: LoginRequest) {
      this.isLoading = true;
      try {
        const res = await authApi.login(data);
        const { token, admin } = res.data;

        if (token) {
          this.token = token;
          this.user = admin || null;
          localStorage.setItem("admin_token", token);

          toast.success("🎉 Đăng nhập thành công!", { autoClose: 2000 });
          return { success: true };
        } else {
          throw new Error("Token không tồn tại trong phản hồi.");
        }
      } catch (err: any) {
        const message =
          err.response?.data?.message || err.message || "Đăng nhập thất bại!";
        toast.error(`❌ ${message}`, { autoClose: 3000 });
        console.error("Đăng nhập thất bại:", err);

        return { success: false, message };
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("admin_token");
      toast.info("🚪 Đã đăng xuất!", { autoClose: 1500 });
    },
  },
});
