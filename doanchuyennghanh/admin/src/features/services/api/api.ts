import axios from "axios";

class api {
  get = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/admin/services/");
    return res.data;
  };

  create = async (serviceData: any) => {
    console.log(serviceData);
    const res = await axios.post("http://localhost:3000/api/v1/admin/services/create", {
      name: serviceData.name,
      description: serviceData.description,
      price: serviceData.price,
      category_id: serviceData.category_id,
      image_url: serviceData.image_url || '',
      is_available: serviceData.is_available
    });
    return res.data;
  };

  update = async (id: string, serviceData: any) => {
    const res = await axios.put(`http://localhost:3000/api/v1/admin/services/update/${id}`, serviceData);
    return res.data;
  };

  delete = async (id: string) => {
    const res = await axios.delete(`http://localhost:3000/api/v1/admin/services/delete/${id}`);
    return res.data;
  };

  // Service Dishes APIs
  getServiceDishes = async (serviceId: number) => {
    const res = await axios.get(`http://localhost:3000/api/v1/admin/service-dishes/service/${serviceId}`);
    return res.data;
  };

  getServiceWithDishes = async (serviceId: number) => {
    const res = await axios.get(`http://localhost:3000/api/v1/admin/service-dishes/service-with-dishes/${serviceId}`);
    return res.data;
  };

  addDishToService = async (serviceDishData: any) => {
    const res = await axios.post("http://localhost:3000/api/v1/admin/service-dishes/create", serviceDishData);
    return res.data;
  };

  addMultipleDishesToService = async (serviceId: number, dishes: any[]) => {
    const res = await axios.post("http://localhost:3000/api/v1/admin/service-dishes/add-multiple", {
      service_id: serviceId,
      dishes: dishes
    });
    return res.data;
  };

  updateServiceDishQuantity = async (id: number, quantity: number) => {
    const res = await axios.put(`http://localhost:3000/api/v1/admin/service-dishes/update-quantity/${id}`, {
      quantity: quantity
    });
    return res.data;
  };

  deleteServiceDish = async (id: number) => {
    const res = await axios.delete(`http://localhost:3000/api/v1/admin/service-dishes/delete/${id}`);
    return res.data;
  };

  updateimgg = async (data: any) => {
    const key = "7c1c9b60dd120c68395198d20d5d56fa";
    const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;
    const res = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  };
}

export const Api = new api();