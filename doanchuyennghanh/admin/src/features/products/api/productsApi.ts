import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/admin/dishes");
  return res.data;
};