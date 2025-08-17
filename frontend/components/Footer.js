"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer className='border-t bg-background/50 backdrop-blur-sm p-6'>
            <div className='container mx-auto flex flex-col items-center justify-center space-y-4 text-center'>
                <div className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Cheems-Writes. All rights reserved.
                </div>

                <div className='flex space-x-4'>
                    <Link href="https://github.com/Cheemx" target="_blank" rel="noopener noreferrer">
                        <Button variant='ghost' size='icon' className='rounded-full'>
                            <FaGithub className='h-5 w-5' />
                        </Button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/chinmay-mahajan-104b18229/" target="_blank" rel="noopener noreferrer">
                        <Button variant='ghost' size='icon' className='rounded-full'>
                            <FaLinkedin className='h-5 w-5' />
                        </Button>
                    </Link>
                    <Link href="https://x.com/cheems_exo" target="_blank" rel="noopener noreferrer">
                        <Button variant='ghost' size='icon' className='rounded-full'>
                            <FaTwitter className='h-5 w-5' />
                        </Button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
