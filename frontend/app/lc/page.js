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

const SolutionsPage = () => {
    const [solutions, setSolutions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setError('');
            try {
                const res = await axios.get("http://localhost:8080/api/solution/", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.status === 200) {
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

    if (loading) {
        return <p className="text-center mt-6 text-muted-foreground">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-6">{error}</p>;
    }

    if (solutions === null) {
        return (
            <>
                <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">
                        Occasionally Smarter Than Yesterday 👽
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
            <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                    Occasionally Smarter Than Yesterday 👽
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {solutions.map((solution) => (
                    <Card
                        key={solution.number}
                        className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-muted shadow-sm dark:shadow-none hover:border-primary"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">
                                {`Problem ${solution.number}: ${solution.title}`}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-sm text-muted-foreground">{solution.date}</p>
                            <Button asChild className="w-fit mt-2">
                                <Link href={solution.link} passHref>
                                    See Solution
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SolutionsPage;
