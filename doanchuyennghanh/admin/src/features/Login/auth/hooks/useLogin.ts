import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { authApi } from "../api/authApi";
import type { LoginRequest, LoginResponse } from "../types/interface";

export function useLogin() {
  const router = useRouter();

  const login = async (data: LoginRequest): Promise<LoginResponse | void> => {
    try {
      const res = await authApi.login(data);
      if (res.token) {
        localStorage.setItem("admin_token", res.token);
        toast.success("Đăng nhập thành công!", { autoClose: 2000 });
        await router.push("/admin/dashboard");
        return res as LoginResponse;
      } else {
        throw new Error("Token không tồn tại trong phản hồi.");
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Đăng nhập thất bại!";
      toast.error(message, { autoClose: 3000 });
    }
  };

  return { login };
}
