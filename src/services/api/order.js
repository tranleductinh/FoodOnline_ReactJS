import api from "./index";

export const getAllOrders = async () => {
    return await api.get("/order");
}

export const addOrder = async (data) => {
    return await api.post("/order", data);
}


export const changeStatus = async (id, data) => {
    return await api.put(`/order/change-status/${id}`, data);
}

export const deleteOrder = async (id) => {
    return await api.delete(`/order/${id}`);
}

export const getOrderById = async () => {
    return await api.get(`/order/my-orders`);
}