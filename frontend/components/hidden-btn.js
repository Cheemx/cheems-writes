"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HiddenLoginTrigger() {
    const [visible, setVisible] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handler = (e) => {
            // Example: Ctrl + Alt + L reveals the button
            if (e.ctrlKey && e.altKey && e.key === "l") {
                setVisible((prev) => !prev)
            }
        }

        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    if (!visible) return null

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button
                variant="outline"
                size="sm"
                className="shadow-md"
                onClick={() => router.push("/admin/login")}
            >
                Admin Login
            </Button>
        </div>
    )
}
