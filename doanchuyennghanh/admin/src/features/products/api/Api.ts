import axios from "axios";

export const get = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/admin/dishes");
  return res.data; // trả về { data: [...] }
};
export const create = async (productData: FormData) => {
  console.log(productData);
  const res = await axios.post("http://localhost:3000/api/v1/admin/dishes/create", productData);
  return res.data;
} ;
export const update = async ( productData: any) => {
  console.log(productData);
  const id = productData.id;
  const res = await axios.put(`http://localhost:3000/api/v1/admin/dishes/update/${id}`, productData, );
  return res.data;
};
export const deleteId= async (id: string) => {
  const res = await axios.delete(`http://localhost:3000/api/v1/admin/dishes/delete/${id}`);
  return res.data;
}