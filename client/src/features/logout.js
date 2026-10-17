import { api } from "../utils/axios.js"


export const logout = async (token) => {
    try {
        const {data} = await api.post("/api/auth/logout", {token})
        return data
    } catch (error) {
        console.log(error)
        return null;
    }
}