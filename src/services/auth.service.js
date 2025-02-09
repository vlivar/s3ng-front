import { instance } from "../api/axios.api";
import { ResponceLogin } from "../models/ResponceLogin";
import { ResponceUserData } from "../models/ResponceUserData";
import { UserData } from "../models/UserData";

export const AuthService = {
    /**
     * @param {UserData} userData
     * @returns {Promise<ResponceUserData>}
     */
    async registration(userData) {
        const {data} = await instance.post("register", userData)
        return new ResponceUserData(
            data
        );
    },

    /**
     * @param {UserData} userData
     * @returns {Promise<ResponceLogin>}
     */
    async login(userData) {
        const {data} = await instance.post("auth", userData)
        return new ResponceLogin(
            data
        );
    },
}