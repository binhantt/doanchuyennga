import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/admin/dishes");
  return res.data; // trả về { data: [...] }
};
export const createProduct = async (productData: FormData) => {
  const res = await axios.post("http://localhost:3000/api/v1/admin/dishes", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
} ;
export const updateProduct = async (id: string, productData: FormData) => {
  const res = await axios.put(`http://localhost:3000/api/v1/admin/dishes/update/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`http://localhost:3000/api/v1/admin/dishes/delete/${id}`);
  return res.data;
}