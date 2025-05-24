"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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

export default function Solution({ params }) {
    const { slug } = params;
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

                const res = await axios.get(`http://localhost:8080/api/tech-blogs/${slug}`, {
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
                        .use(rehypePrettyCode, {
                            theme: {
                                dark: "github-dark",
                                light: "github-light",
                            },
                            transformers: [transformerCopyButton({ visibility: "always" })],
                        })
                        .use(rehypeStringify)
                        .process(data.content);

                    setHtml(processed.toString());
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
            const res = await axios.delete(`http://localhost:8080/api/tech-blogs/${slug}`, {
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

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;
    if (!blog) return null;

    const createdDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen py-8 px-4 max-w-5xl mx-auto">
            <Card className="bg-background/70 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-bold">{blog.title}</CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground mt-2">
                                <span className="mr-2">| {blog.description}</span>
                                <Badge variant="outline" className="ml-auto">
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
