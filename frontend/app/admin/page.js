"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <Card className="w-full max-w-md bg-background/60 backdrop-blur-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Admin Dashboard</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Button
                        className="w-full relative overflow-hidden group"
                        onClick={() => router.push("/admin/tb")}
                        variant="outline"
                    >
                        Create Tech Blog
                    </Button>

                    <Button
                        className="w-full relative overflow-hidden group"
                        onClick={() => router.push("/admin/wc")}
                        variant="outline"
                    >
                        Create Daily Blog
                    </Button>

                    <Button
                        className="w-full relative overflow-hidden group"
                        onClick={() => router.push("/admin/lc")}
                        variant="outline"
                    >
                        Create LC Solution
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
