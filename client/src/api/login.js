import { api } from "../utils/axios.js"


export const login = async (token) => {
    try {
        const {data} = await api.post("/api/auth/login", {token})
        return data
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.message || "Login request failed", { cause: error })
    }
}