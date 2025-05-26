"use client"

import { useState, useEffect } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers'
import axios from "axios"
import { notFound } from "next/navigation"

const CreateDailyBlog = () => {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [htmlPreview, setHtmlPreview] = useState("")
    const [showPreview, setShowPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const convertMarkdown = async () => {
            const file = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypePrettyCode, {
                    theme: {
                        dark: "github-dark",
                        light: "github-light",
                    },
                    transformers: [
                        transformerCopyButton({
                            visibility: 'always',
                            feedbackDuration: 3_000,
                        }),
                    ],
                })
                .use(rehypeStringify)
                .process(content)
            setHtmlPreview(String(file))
        }

        convertMarkdown()
    }, [content])

    const handleSubmit = async () => {
        const token = localStorage.getItem("token")
        setLoading(true)
        setError("")

        const res = await axios.post(
            "https://cheems-writes.onrender.com/api/daily-blogs/create",
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

        if (res.status === 201) {
            console.log(data)
            router.push("/wc")
        } else {
            setError(data || "Invalid credentials")
            return notFound()
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen p-4 flex flex-col items-center gap-6">
            <div className="w-full max-w-7xl flex flex-col gap-6">
                {/* Toggle Switch */}
                <div className="flex items-center justify-end pr-2">
                    <Label htmlFor="preview-switch" className="mr-2">
                        Live Preview
                    </Label>
                    <Switch
                        id="preview-switch"
                        checked={showPreview}
                        onCheckedChange={() => setShowPreview(!showPreview)}
                    />
                </div>

                {/* Layout */}
                <div
                    className={`grid w-full ${showPreview ? "md:grid-cols-2" : "grid-cols-1"
                        } gap-6`}
                >
                    {/* Form */}
                    <Card className="w-full bg-background/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl">Write Today&apos;s Blog ?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-1">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Awesome Blog Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    placeholder="awesome-blog-title"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="A short description of the blog"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="content">Content (Markdown)</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Write your markdown here..."
                                    className="h-[80vh] resize-none"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? "Submitting..." : "Submit Blog"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Preview (conditionally shown) */}
                    {showPreview && (
                        <Card className="w-full bg-background/50 backdrop-blur-sm overflow-auto">
                            <CardHeader>
                                <CardTitle className="text-lg">Live Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="prose max-w-none dark:prose-invert">
                                <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateDailyBlog
