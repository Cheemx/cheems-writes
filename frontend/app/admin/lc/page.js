// app/(admin)/lc/create/page.tsx

"use client"

import { useState } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

const CreateLCSolution = () => {
    const router = useRouter()
    const [problemNumber, setProblemNumber] = useState("")
    const [problemName, setProblemName] = useState("")
    const [solutionLink, setSolutionLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        const token = localStorage.getItem("token")
        setLoading(true)
        setError("")

        const res = await axios.post(
            "http://localhost:8080/api/solution",
            {
                title,
                description,
                slug,
                content
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        const data = await res.data

        if (res.status === 200) {
            console.log(data)
            router.push("/blogs")
        } else {
            setError(data || "Invalid credentials")
            return notFound()
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen p-4 flex flex-col items-center gap-6">
            <Card className="w-full bg-background/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Submit LC Solution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-1">
                        <Label htmlFor="number">Problem Number</Label>
                        <Input id="number" value={problemNumber} onChange={(e) => setProblemNumber(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="name">Problem Name</Label>
                        <Input id="name" value={problemName} onChange={(e) => setProblemName(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="link">Solution Link</Label>
                        <Input id="link" value={solutionLink} onChange={(e) => setSolutionLink(e.target.value)} />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit Solution"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateLCSolution
