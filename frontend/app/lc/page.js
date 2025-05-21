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

const solutions = [
    {
        number: 1,
        title: 'Two Sum',
        date: '2023-10-01',
        link: '/solutions/two-sum',
    },
    {
        number: 2,
        title: 'Add Two Numbers',
        date: '2023-10-02',
        link: '/solutions/add-two-numbers',
    },
    {
        number: 3,
        title: 'Longest Substring Without Repeating Characters',
        date: '2023-10-03',
        link: '/solutions/longest-substring',
    },
];

const SolutionsPage = () => {
    return (
        <div className="p-0 px-2 sm:px-4 md:px-6">
            <div className="sticky top-17 z-0 w-full px-4 py-4 backdrop-blur-md bg-background/80 border-b border-border shadow">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">
                    I try LeetCode (Sometimes 🫡)
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
