import api from "./index";

export const getCart = async () => {
    return await api.get("/cart");
};

export const addToCart = async (data) => {
    return await api.post("/cart", data);
};
export const minusCart = async (data) => {
    return await api.put("/cart", data);
};

export const deleteCart = async (_id) => {
    return await api.delete(`/cart/${_id}`);
}

export const deleteAllCart = async () => {
    return await api.delete("/cart");
}