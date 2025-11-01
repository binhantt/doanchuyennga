import axios from "axios";

export const get = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/admin/vouchers");
  return res.data; // trả về { data: [...] }
};

export const create = async (voucherData: any) => {
  console.log(voucherData);
  const res = await axios.post("http://localhost:3000/api/v1/admin/vouchers/create", voucherData);
  return res.data;
};

export const update = async (voucherData: any) => {
  console.log(voucherData);
  const id = voucherData.id;
  const res = await axios.put(`http://localhost:3000/api/v1/admin/vouchers/update/${id}`, voucherData);
  return res.data;
};

export const deleteId = async (id: string) => {
  const res = await axios.delete(`http://localhost:3000/api/v1/admin/vouchers/delete/${id}`);
  return res.data;
};

export const getById = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/api/v1/admin/vouchers/${id}`);
  return res.data;
};

export const getByCode = async (code: string) => {
  const res = await axios.get(`http://localhost:3000/api/v1/admin/vouchers/code/${code}`);
  return res.data;
};