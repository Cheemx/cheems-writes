// Page to represent specific tech-blog according to slug value
"use client";

import '@/app/globals.css'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import LoadingDidYouKnow from "@/components/loading";

export default function Solution({ params }) {
    const { slug } = use(params);
    const [blog, setBlog] = useState(null);
    const [html, setHtml] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                setToken(storedToken || "");

                const res = await axios.get(`https://s6p67ynfyb.execute-api.ap-south-1.amazonaws.com/tb/getOne/${slug}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (res.status === 200) {
                    const data = res.data;
                    setBlog(data);

                    const processed = await unified()
                        .use(remarkParse)
                        .use(remarkRehype)
                        .use(rehypeSlug)
                        .use(rehypeAutolinkHeadings)
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
                        // .use(rehypeDocument)
                        .use(rehypeFormat)
                        .use(rehypeStringify)
                        .process(data.content);

                    setHtml(String(processed));
                } else {
                    setError("Error while fetching blog by slug");
                }
            } catch (e) {
                console.error(e);
                setError("Failed to load blog");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this blog?")) return;

        try {
            const res = await axios.delete(`https://cheems-writes.onrender.com/api/tech-blogs/${slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                alert("Blog deleted successfully!");
                router.push("/tech-blogs"); // Redirect to blogs list
            } else {
                alert("Failed to delete blog.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    if (loading) return <LoadingDidYouKnow />
    if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
    if (!blog) return null;

    const createdDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen py-6 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Card className="bg-background/90 backdrop-blur-md shadow-xl border border-border">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                        <div>
                            <CardTitle className="text-2xl sm:text-3xl font-bold leading-snug">
                                {blog.title}
                            </CardTitle>

                            <div className="mt-2 pl-3 border-l-4 border-primary">
                                <p className='text-base sm:text-lg italic font-medium text-muted-foreground line-clamp-3'>
                                    {blog.description}
                                </p>                                
                            </div>
                            <div className="mt-3 pl-3">
                                <Badge variant="outline" className="py-1 px-3 text-xs sm:text-sm">
                                    {createdDate}
                                </Badge>
                            </div>
                        </div>

                        {token && (
                            <div className="flex gap-2 mt-1">
                                <Link href={`/admin/edit-blog/${slug}`}>
                                    <Button size="icon" variant="outline" title="Edit blog">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    title="Delete blog"
                                    onClick={handleDelete}
                                >
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </CardContent>
            </Card>
        </div>
    );
}
