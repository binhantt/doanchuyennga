import axios from "axios";
 class api {
  get = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/admin/categories");
    return res.data; // trả về { data: [...] }
  };
  create = async (categoryData: FormData) => {
    const res = await axios.post("http://localhost:3000/api/v1/admin/categories/create", categoryData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };
  update = async (id: string, categoryData: FormData) => {
    const res = await axios.put(`http://localhost:3000/api/v1/admin/categories/${id}`, categoryData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
  delete = async (id: string) => {
    const res = await axios.delete(`http://localhost:3000/api/v1/admin/Categories/delete/${id}`);
    return res.data;
  }
}
export const Api = new api();