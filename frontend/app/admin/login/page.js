// Login page
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import axios from "axios"

const Login = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async () => {
        setLoading(true)
        setError("")

        const res = await axios.post(
            "https://s6p67ynfyb.execute-api.ap-south-1.amazonaws.com/login",
            {username, password},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const data = await res.data

        if (res.status === 200) {
            console.log(data);            
            localStorage.setItem("token", data.token)
            router.push("/admin")
        } else {
            setError(data || "Invalid credentials")
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* 3D Spider Logo in background - assumed handled globally */}

            <Card className="w-full max-w-sm shadow-2xl border">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-center text-red-500">{error}</p>
                    )}

                    <Button
                        onClick={handleLogin}
                        className="w-full relative overflow-hidden group"
                        disabled={loading}
                    >
                        <span className="relative z-10">
                            {loading ? "Logging in..." : "Login"}
                        </span>
                        {/* Fluorescent Red Corner Shine */}
                        <span className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-400 to-pink-500 opacity-20 group-hover:opacity-60 transition-all duration-300 blur-lg scale-110 z-0" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
