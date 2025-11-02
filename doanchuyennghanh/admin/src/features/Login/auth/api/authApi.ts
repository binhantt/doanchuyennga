
import axios from "axios";
export const authApi = {
  async login(payload: { email: string; password: string }) {
    const res = await axios.post("http://localhost:3000/api/v1/admin/athu/login", payload);
    const data = res.data;
    // Parse token từ root hoặc từ user.token theo response bạn cung cấp
    const token = data?.token ?? data?.user?.token ?? null;
    const user = data?.user ?? null;
    console.log(data);
    console.log(token);
    return { token, user };
  },
};
