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

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const dummyBlogs = [
            {
                slug: 'nextjs-theme-toggle',
                title: 'Implementing Dark Mode in Next.js',
                description: 'Learn how to implement a dark/light theme switcher in your Next.js app using Tailwind and shadcn/ui.',
                date: '2025-05-15',
            },
            {
                slug: 'golang-mongodb-crud',
                title: 'Building a CRUD API with Golang & MongoDB',
                description: 'Step-by-step guide to creating RESTful APIs using Go and MongoDB, with best practices.',
                date: '2025-05-10',
            },
            {
                slug: 'tailwind-responsive-layouts',
                title: 'Responsive Layouts with Tailwind CSS',
                description: 'Master Tailwind CSS grids, flexbox, and media queries to build clean responsive UIs.',
                date: '2025-05-05',
            },
        ];
        setBlogs(dummyBlogs);
    }, []);

    return (
        <div className="p-0 px-2 sm:px-4 md:px-6">
            <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                    How Does it Happen?
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {blogs.map((blog) => (
                    <Card
                        key={blog.slug}
                        className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-muted shadow-sm dark:shadow-none hover:border-primary"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">{blog.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-sm text-muted-foreground line-clamp-3">{blog.description}</p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(blog.date).toLocaleDateString()}
                            </p>
                            <div className="mt-3">
                                <Button asChild variant="default" className="w-fit">
                                    <Link href={`/blog/${blog.slug}`} passHref>
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
