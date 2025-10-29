import axios from "axios";

export const getOrders = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/admin/orders/getall");
  return res.data;
};
export const updateOrder = async (id: string, status: string) => {
  const res = await axios.put("http://localhost:3000/api/v1/admin/orders/update", {
    id,
    status,
  });
  return res.data;
};