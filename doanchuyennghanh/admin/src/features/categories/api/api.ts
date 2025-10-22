import axios from "axios";
 class api {
  get = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/admin/categories");
    return res.data; // trả về { data: [...] }
  };
  create = async (categoryData: any) => {
    console.log(categoryData)
    const res = await axios.post("http://localhost:3000/api/v1/admin/categories/create", {name : categoryData.name , image_url : categoryData.image_url || ''});
    return res.data;
  };
  update = async (id: string, categoryData: any) => {
    const res = await axios.put(`http://localhost:3000/api/v1/admin/categories/update/${id}`, categoryData);
    return res.data;
  }
  delete = async (id: string) => {
    const res = await axios.delete(`http://localhost:3000/api/v1/admin/Categories/delete/${id}`);
    return res.data;
  }
  updateimgg = async (data: any) => {
    const key = "7c1c9b60dd120c68395198d20d5d56fa";
    const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;
      const res = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    
  }
}
export const Api = new api();