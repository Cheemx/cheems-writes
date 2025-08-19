// Page to get all tech-blogs
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import LoadingDidYouKnow from '@/components/loading';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
            setError("");

            try {
                const res = await axios.get("https://s6p67ynfyb.execute-api.ap-south-1.amazonaws.com/tb/getall", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = res.data;
                console.log(data)

                if (res.status === 200) {
                    setBlogs(data);
                } else {
                    setError("Error while getting Tech-Blogs");
                }
            } catch (e) {
                console.error(e);
                setError("Error fetching blogs");
            } finally {
                setLoading(false)
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <LoadingDidYouKnow />

    if (blogs === null) {
        return (
            <>
                <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">
                        NOTHING HERE AT THE MOMENT!!!
                    </h1>
                </div>
                <div className="text-center text-xl text-muted-foreground mt-12">
                    🚧 Tech Blogs Coming Soon...
                </div>
            </>
        );
    }

    return (
        <div className="p-0 px-2 sm:px-4 md:px-6">
            <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                    Let&apos;s talk about-
                </h1>
            </div>

            {error && (
                <p className="text-center text-red-500 mt-4">{error}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {blogs
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((blog) => (
                        <Card
                            key={blog.slug}
                            className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-muted shadow-sm dark:shadow-none hover:border-primary"
                        >
                            <CardHeader>
                                <CardTitle className="text-lg sm:text-xl">
                                    {blog.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                    {blog.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </p>
                                <div className="mt-3">
                                    <Button asChild variant="default" className="w-fit">
                                        <Link href={`/tb/${blog.slug}`} passHref>
                                            Read More
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default Blogs;
