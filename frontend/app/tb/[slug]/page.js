// app/(main)/blogs/[slug]/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypePrettyCode from "rehype-pretty-code"
import { transformerCopyButton } from "@rehype-pretty/transformers"

export default async function Solution({ params }) {
    const { slug } = params

    // Fetch blog from API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tb/blog?slug=${slug}`, {
        cache: "no-store",
    })

    if (!res.ok) return notFound()

    const blog = await res.json()

    // Parse Markdown content to HTML
    const processed = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
            theme: {
                dark: "github-dark",
                light: "github-light",
            },
            transformers: [transformerCopyButton({ visibility: "always" })],
        })
        .use(rehypeStringify)
        .process(blog.content)

    const html = processed.toString()
    const createdDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="min-h-screen py-8 px-4 max-w-5xl mx-auto">
            <Card className="bg-background/70 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{blog.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <span className="mr-2">| {blog.description}</span>
                        <Badge variant="outline" className="ml-auto">
                            {createdDate}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </CardContent>
            </Card>
        </div>
    )
}
