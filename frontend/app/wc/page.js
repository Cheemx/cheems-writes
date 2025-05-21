'use client';

import React from 'react';
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogs = [
    {
        title: 'Learning React',
        date: '2023-10-01',
        description: 'Today I learned about React hooks and how to manage state effectively.',
        slug: 'learning-react',
    },
    {
        title: 'Understanding Tailwind CSS',
        date: '2023-10-02',
        description: 'I explored Tailwind CSS and how to create responsive designs easily.',
        slug: 'understanding-tailwind-css',
    },
    // Add more blog entries as needed
];

const WhatILearnedToday = () => {
    return (
        <div className="flex flex-col items-center justify-center px-4">
            <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                    What I Learned Today
                </h1>
            </div>


            <div className="w-full max-w-2xl space-y-6">
                {blogs.map((blog) => (
                    <Card
                        key={blog.slug}
                        className="group transition-all duration-300 hover:scale-[1.01] hover:shadow-xl border border-muted shadow-sm dark:shadow-none hover:border-primary"
                    >
                        <CardHeader>
                            <CardTitle className="text-xl">{blog.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-sm text-muted-foreground">{blog.date}</p>
                            <p className="text-sm text-muted-foreground">{blog.description}</p>
                            <Button asChild className="w-fit mt-3">
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
