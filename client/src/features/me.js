import { api } from "../utils/axios.js"



export const me = async () => {
    try {
        const res = await api.get("/api/me")
        return res.data
    } catch (error) {
        console.log(error)
        return null;
    }
}