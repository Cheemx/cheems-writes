// Page to get all daily Blogs
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

const WhatILearnedToday = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            setError("");

            try {
                const res = await axios.get(
                    "https://s6p67ynfyb.execute-api.ap-south-1.amazonaws.com/wc/getAll",
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

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
                        Today I Learned... and Forgot 🧠
                    </h1>
                </div>
                <div className="text-center text-xl text-muted-foreground mt-12">
                    🚧 Daily Blogs Coming Soon...
                </div>
            </>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center px-4">
            <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                    Today I Learned... and Forgot 🧠
                </h1>
            </div>

            {error && (
                <p className="text-center text-red-500 mt-4">{error}</p>
            )}

            <div className="w-full max-w-2xl space-y-6">
                {blogs.map((blog) => (
                    <Card
                        key={blog.slug}
                        className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-muted shadow-sm dark:shadow-none hover:border-primary"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">{blog.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-sm text-muted-foreground line-clamp-1">
                                {blog.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                            <Button asChild variant="default"
                                className="w-fit mt-3">
                                <Link href={`/wc/${blog.slug}`} passHref>
                                    Read More
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default WhatILearnedToday;
