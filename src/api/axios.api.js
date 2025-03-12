import axios from "axios";

import { store } from "../store/store";
import { logoutAction, setAccessToken } from "../store/user/userSlice";
import { getTokenFromLocalStorage, setAccessTokenToLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create(
    {
        baseURL: "http://localhost:8080/",
        withCredentials: true
    }
)

instance.interceptors.request.use((config) => {
    const token = getTokenFromLocalStorage()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

instance.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401) {
            originalRequest._retry = true;
            try {
                const { data } = await instance.post("refresh", {})
                store.dispatch(setAccessToken(data.accessToken))
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
                return instance(originalRequest)
            } catch (err) {
                setTimeout(resolve, 2000)
                store.dispatch(logoutAction())
            }
        }
        return Promise.reject(error);
    }
)