import api from "./index";

export const addFood = async (data) => {
    return await api.post("/food", data);
};

export const getAllFoods = async () => {
    return await api.get("/food");
};

export const deleteFood = async (id) => {
    return await api.delete(`/food/${id}`);
};

export const updateFood = async (id, data) => {
    return await api.put(`/food/${id}`, data);
};
export const changeAvailable = async (id, data) => {
    return await api.put(`/food/change-available/${id}`, data);
}