"use client"
import Link from 'next/link';
import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { X, Menu } from 'lucide-react'; // Ensure you have lucide-react installed for icons
import { ModeToggle } from './theme-btn';
import HiddenLoginTrigger from './hidden-btn';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur-xs border-b z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href={"/"}>
                        <div className="text-lg font-bold">
                            Cheems-writes
                        </div>
                    </Link>
                    <div className='hidden md:flex space-x-4 items-center'>
                        <Link href="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300"> Home
                        </Link>
                        <Link href="/blogs" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
                            Tech-Blogs
                        </Link>
                        <Link href="/lc" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
                            LC-Solutions
                        </Link>
                        <Link href="/wc" className="hover:scale-105 hover:font-semibold transition-transform duration-300">
                            What&apos;s Cookin&apos;?
                        </Link>
                        <ModeToggle />
                    </div>

                    <div className="md:hidden">
                        <span className="mx-2">
                            <ModeToggle />
                        </span>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger>
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Cheemx-writes</SheetTitle>
                                    <SheetDescription>
                                        I Try to Cook Here 😉
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col">
                                    <Link href="/" className="px-4 py-2" onClick={() => setIsOpen(false)}>Home</Link>
                                    <Link href="/blogs" className="px-4 py-2" onClick={() => setIsOpen(false)}>Tech Blogs</Link>
                                    <Link href="/lc" className="px-4 py-2" onClick={() => setIsOpen(false)}>LC Solutions</Link>
                                    <Link href="/wc" className="px-4 py-2" onClick={() => setIsOpen(false)}>What&apos;s Cookin&apos;?</Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
            <HiddenLoginTrigger />
        </>
    );
};

export default Navbar;
