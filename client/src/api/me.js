import { api } from "../utils/axios.js"



export const me = async () => {
    try {
        const res = await api.get("/api/me")
        return res.data.user
    } catch (error) {
        if (error.response?.status !== 401) {
            console.error("Current user request failed:", error)
        }
        return null;
    }
}