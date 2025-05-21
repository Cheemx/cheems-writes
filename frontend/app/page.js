'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const projects = [
    {
        name: "ChitChat",
        desc: "Real-time messaging using WebSockets and Golang-MongoDB backend.",
        live: "https://chit-chat-green.vercel.app/",
        git: "https://github.com/Cheemx/Chit-Chat",
    },
    {
        name: "Report Relay",
        desc: "Generate & distribute reports (PDF) using MERN.",
        live: "https://report-relay.vercel.app/",
        git: "https://github.com/Cheemx/Report-Relay",
    },
    {
        name: "Cheems-Writes",
        desc: "Markdown blogging with Next.js, Golang, MongoDB.",
        live: "https://your-portfolio-live-link.com",
        git: "https://github.com/Cheemx/cheems-writes",
    },
]

const techSkills = [
    "C++, Python, JavaScript, Go",
    "Node.js, Go (mux, gin)",
    "WebSockets, REST APIs, ERP, Web Architecture",
    "VS Code, Git, Postman, Bash",
    "CN, OS, DBMS",
];

export default function IntroSection() {
    return (
        <div className="px-6 py-6 bg-background/50 backdrop-blur-sm sticky w-full h-screen">
            {/* Header with HoverCard positioned below */}
            <h2 className="text-3xl font-bold cursor-default">
                <HoverCard openDelay={100} closeDelay={300}>
                    <HoverCardTrigger asChild>
                        <span className="cursor-pointer hover:text-primary transition">
                            Chinmay Mahajan
                        </span>
                    </HoverCardTrigger>
                    <HoverCardContent side="bottom" align="start" className="w-80">
                        <p className="text-sm text-muted-foreground">
                            Backend enthusiast | Final Year Undergraduate
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </h2>


            {/* Links */}
            <div className="flex gap-3 my-4">
                <Button variant="outline" asChild className="gap-2">
                    <Link href="https://github.com/Cheemx" target="_blank">
                        GitHub <ExternalLink size={14} />
                    </Link>
                </Button>
                <Button variant="outline" asChild className="gap-2">
                    <Link href="https://leetcode.com/u/myself_cm_/" target="_blank">
                        LeetCode <ExternalLink size={14} />
                    </Link>
                </Button>
            </div>

            {/* Projects */}
            <p className="text-2xl font-semibold mt-6 mb-4">Projects:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="w-full h-40 shadow-md dark:shadow-gray-700 hover:shadow-lg dark:hover:shadow-gray-900 transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                                    {project.desc}
                                </p>
                                <div className="flex gap-2">
                                    <Button variant="link" asChild>
                                        <Link href={project.live} target="_blank">Live Site</Link>
                                    </Button>
                                    <Button variant="link" asChild>
                                        <Link href={project.git} target="_blank">GitHub</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Technical Skills with slide-in animation */}
            <p className="text-2xl font-semibold mt-6">Technical Skills:</p>
            <motion.ul
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-sm text-muted-foreground mt-2 space-y-2 list-disc list-inside"
            >
                {techSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                ))}
            </motion.ul>
        </div>
    )
}
