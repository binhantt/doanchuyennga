
import axios from "axios";
export const authApi = {
  async login(payload: { email: string; password: string }) {
    const res = await axios.post("http://localhost:3000/api/v1/admin/athu/login", payload);
    console.log(res.data.user)
    return res.data.user; 
  },
};
