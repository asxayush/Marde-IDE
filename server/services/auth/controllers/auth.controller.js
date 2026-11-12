import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../model/user.models.js"
import crypto from "crypto"
import redis from "../../../shared/redis/redis.js";

export const login = async(req, res) => {
    try{
        const {token} = req.body
        if (!token) {
            return res.status(400).json({message: "Firebase token is required"})
        }
        const decoded = await getAuth(app).verifyIdToken(token)
       
        let user = await User.findOne({
            firebaseUid:decoded.uid
        })

        if(!user){
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name || decoded.email?.split("@")[0] || "Marde user",
                email: decoded.email,
                avatar: decoded.picture,
            })
        }

        const sessionId = crypto.randomUUID()

        await redis.set(`session-${sessionId}`, JSON.stringify({
            name: user.name,
            _id: user._id,
            email:user.email,
            avatar:user.avatar
        }), "EX", 7*24*60*60)


        res.cookie("session", sessionId, {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000
        })

         //use redis for session managment
        return res.status(200).json(user)
    } catch (error) {
        console.error("Login error:", error)
        const firebaseTokenError = [
            "auth/argument-error",
            "auth/id-token-expired",
            "auth/id-token-revoked",
            "auth/invalid-id-token",
        ].includes(error?.code)
        const status = firebaseTokenError ? 401 : 500
        return res.status(status).json({
            message: firebaseTokenError ? "Invalid or expired Firebase token" : "Login failed",
        })
   }
}

export const logout = async (req, res) => {
    try {
        const sessionId = req.cookies?.session
        if (!sessionId) {
            return res.status(204).send()
        }
        await redis.del(`session-${sessionId}`)

        res.clearCookie("session")

         return res.status(200).json({message: "Logout successfully"})
    } catch (error) {
         console.error("Logout error:", error)
        return res.status(500).json({message: `Logout Error`})
    }
}