import api from "./index";

export const googleLogin = async(idToken) => {
    return await api.post("/auth/google-login", {idToken});
}

export const refreshToken = async() => {
    return await api.post("/auth/refresh-token");
}

export const signIn = async(payload) => {
    return await api.post("/auth/sign-in", payload);
}

export const getMe = async() => {
    return await api.get("/auth/me");
}

export const logOut = async() => {
    return await api.post("/auth/log-out");
}