import axios from "axios";

export const get = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/admin/wedding-packages");
  return res.data;
};

export const create = async (packageData: FormData) => {
  console.log("📡 Sending create request with data:", packageData);
  const res = await axios.post("http://localhost:3000/api/v1/admin/wedding-packages/create", packageData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const update = async (packageData: any) => {
  console.log(packageData);
  const id = packageData.id;
  const res = await axios.put(`http://localhost:3000/api/v1/admin/wedding-packages/update/${id}`, packageData);
  return res.data;
};

export const deleteId = async (id: string) => {
  const res = await axios.delete(`http://localhost:3000/api/v1/admin/wedding-packages/delete/${id}`);
  return res.data;
};