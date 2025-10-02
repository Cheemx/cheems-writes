// Page to get all LC solutions
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import LoadingDidYouKnow from '@/components/loading';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const SolutionsPage = () => {
    const [solutions, setSolutions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setError('');
            try {
                const res = await axios.get("https://s6p67ynfyb.execute-api.ap-south-1.amazonaws.com/lc/getAll", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.status === 200) {
                    console.log(res.data);
                    setSolutions(res.data);
                } else {
                    setError("Error while getting solutions.");
                }
            } catch (e) {
                console.error(e);
                setError("Error fetching solutions.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <LoadingDidYouKnow />

    if (error) {
        return <p className="text-center text-red-500 mt-6">{error}</p>;
    }

    if (solutions === null) {
        return (
            <>
                <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">
                        DB Fuked UP I GUESS!
                    </h1>
                </div>
                <div className="text-center text-xl text-muted-foreground mt-12">
                    🚧 Solutions Coming Soon...
                </div>
            </>
        );
    }

    return (
        <div className="p-0 px-2 sm:px-4 md:px-6">
            {/* Sticky Header */}
            <div className="sticky top-17 z-10 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                    Trying LC Occasionally
                </h1>
            </div>

            {/* Grid of Cards */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {solutions
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                    .map((solution) => (
                        <Card
                            key={solution.id}
                            className="flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg font-semibold truncate">
                                    {`LC ${solution.problemNo}: ${solution.name}`}
                                </CardTitle>
                                <CardDescription className="text-xs text-muted-foreground">
                                    {new Date(solution.createdAt).toLocaleDateString("en-GB")}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter className="mt-auto">
                                <Button
                                    asChild
                                    variant="default"
                                    size="sm"
                                    className="w-fit hover:bg-primary/10"
                                >
                                    <Link href={solution.link} target="_blank">
                                        See Solution
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default SolutionsPage;
