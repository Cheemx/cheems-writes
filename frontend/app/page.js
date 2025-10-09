'use client'

import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const keyProjects = [
    {
        name: "Stock-Portfolio-Tracker",
        desc: "RESTful API with Go. Real-time stock tracking. SSE, Redis caching, rate limiting, background processing.",
        git: "https://github.com/Cheemx/stock-portfolio-tracker-api",
    },
    {
        name: "Gator",
        desc: "RSS feed aggregator CLI in Go with PostgreSQL backend. Manage feeds, follow sources, browse posts.",
        git: "https://github.com/Cheemx/gator",
    },
    {
        name: "Cheems-Writes (Backend)",
        desc: "Serverless backend in Go, MongoDB, AWS Lambda. Deployed with Serverless Framework.",
        git: "https://github.com/Cheemx/cw-backend",
    },
    {
        name: "Chit-Chat",
        desc: "Real-time chat app with Go, React.js, MongoDB. First Go project, deployed on Render.",
        live: "https://chit-chat-green.vercel.app/",
        git: "https://github.com/Cheemx/Chit-Chat",
    },
    {
        name: "Report-Relay",
        desc: "Web app for teachers to manage and send performance reports. Built with MERN stack.",
        live: "https://report-relay.vercel.app/",
        git: "https://github.com/Cheemx/Report-Relay",
    },
]

const wipProjects = [
    {
        name: "Go-gRPC-GraphQL",
        desc: "Trying to explore and understand grpc and graphQL in golang",
        git: "https://github.com/Cheemx/learning-go-grpc-graphql"
    },
    {
        name: "Forever-Store",
        desc: "Distributed file storage library in Go. Encrypted peer-to-peer CAS storage.",
        git: "https://github.com/Cheemx/forever-store",
    },
    {
        name: "Gocan",
        desc: "Containerization attempt in Go. Terminal implementation complete, programmatic in progress.",
        git: "https://github.com/Cheemx/gocan",
    },
    { name: "Torrent-Client", desc: "Peer-to-peer file sharing client. (Idea stage)" },
    { name: "Go-Grafana", desc: "Analytics engine (planned). Stack: Redis Streams, Golang, PostgreSQL." },
]

const repos = [
    {
        name: "Exercism-Go",
        desc: "Daily dose of brain-tickle.",
        git: "https://github.com/Cheemx/exercism_go",
    },
    {
        name: "Chirpy",
        desc: "Twitter/X clone. Focus: Understanding HTTP servers in Go.",
        git: "https://github.com/Cheemx/chirpy",
    },
    {
        name: "Pokedex-CLI",
        desc: "CLI tool for exploring Pokémon. Features: Catch Pokémon, manage collection.",
        git: "https://github.com/Cheemx/pokedexcli",
    },
    {
        name: "Cheems-Writes (Go-Mux Version)",
        desc: "Original modular backend prototype using Go-Mux.",
        git: "https://github.com/Cheemx/cheems-writes",
    },
]

const learning = [
    {
        title: "Stream Onboarding (Independent)",
        desc: "6/10 weeks complete. Covered: Go fundamentals, testing, SQL, HTTP & JSON, Redis, advanced Go packages. Currently: Monitoring & Observability.",
        link: "https://cheems-writes.vercel.app/wc/advanced-go",
    },
    {
        title: "Boot.dev Backend Path",
        desc: "12 courses completed (Python, Linux, Git, OOP, FP, DSA, C Memory Mgmt, Go, HTTP, SQL, Docker). In Progress: CI/CD. Upcoming: HTTP Protocol, Advanced Git, Kubernetes.",
        link: "https://www.boot.dev/u/cheems_exo",
    },
]

const techKeywords = {
    Languages: ["Golang", "Python", "C (basic)", "JavaScript"],
    Databases: ["MongoDB", "PostgreSQL", "Redis"],
    Tools: ["Docker", "AWS", "Serverless Framework", "Git", "Linux", "CI/CD"],
    Focus: ["Backend Development", "Systems Programming", "Networking", "Observability", "Infrastructure as Code"],
    Concepts: [
        "Distributed Systems",
        "Containerization",
        "SSE",
        "Rate Limiting",
        "Caching",
        "Background Jobs",
    ],
}

function SectionTitle({ children }) {
    return (
        <p className="text-2xl font-semibold mt-8 mb-4 border-b pb-2 border-primary/40">
            {children}
        </p>
    )
}

function ProjectCard({ project }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
        >
            <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{project.desc}</p>
                    <div className="flex gap-4 flex-wrap">
                        {project.live && (
                            <Button variant="link" asChild>
                                <Link href={project.live} target="_blank">Live</Link>
                            </Button>
                        )}
                        {project.git && (
                            <Button variant="link" asChild>
                                <Link href={project.git} target="_blank">GitHub</Link>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default function IntroSection() {
    return (
        <div className="px-6 py-6 bg-background/50 backdrop-blur-sm w-full h-full">
            {/* Header */}
            <h2 className="text-3xl font-bold cursor-default">
                <HoverCard openDelay={100} closeDelay={300}>
                    <HoverCardTrigger asChild>
                        <span className="cursor-pointer hover:text-primary transition">
                            Chinmay Mahajan
                        </span>
                    </HoverCardTrigger>

                    <HoverCardContent
                        side="bottom"
                        align="start"
                        className="w-80 bg-background text-red-500 border rounded-md shadow-lg"
                    >
                        <p className="text-sm">Backend in Golang!</p>
                    </HoverCardContent>
                </HoverCard>

            </h2>

            {/* Links */}
            <div className="flex gap-3 my-4">
                <Button variant="default" asChild className="gap-2">
                    <Link href="https://github.com/Cheemx" target="_blank">GitHub <ExternalLink size={14} /></Link>
                </Button>
                <Button variant="default" asChild className="gap-2">
                    <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=chinmaymahajan999@gmail.com" target="_blank">Email <ExternalLink size={14} /></Link>
                </Button>
                <Button variant="default" asChild className="gap-2">
                    <Link href="https://leetcode.com/u/cheemx_exo/" target="_blank">Leetcode <ExternalLink size={14} /></Link>
                </Button>
            </div>

            {/* Intro */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative my-8 pl-6 border-l-4 border-primary"
            >
                <p className="text-base leading-relaxed text-foreground/90 italic">
                    Hi! This is <span className="font-semibold">Chinmay</span>. I enjoy
                    exploring backend systems with a strong interest in{" "}
                    <span className="text-primary font-medium">Golang</span> and{" "}
                    <span className="text-primary font-medium">Distributed Systems</span>.
                    <br /><br />
                    Graduated: <span className="font-medium">June 2025</span>. Currently
                    following{" "}
                    <span className="font-medium">Stream&apos;s 10-week Go Engineer onboarding plan</span>{" "}
                    and{" "}
                    <span className="font-medium">Boot.dev&apos;s Backend Development Course</span>{" "}
                    to sharpen my backend skills.
                    <br /><br />
                    This site has three main sections:
                    <br />
                    <span className="text-primary font-medium">Tech Blogs</span>,{" "}
                    <span className="text-primary font-medium">LC Solutions</span>,{" "}
                    and <span className="text-primary font-medium">What&apos;s Cookin&apos;?</span>
                    <br /><br />
                    <span className="font-medium">Thanks! and</span><br />
                    <span className="font-semibold text-primary">Enjoy the Show!</span>
                </p>

            </motion.div>

            {/* Key Projects */}
            <SectionTitle>Key Projects (Production-Ready)</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyProjects.map((p, i) => <ProjectCard key={i} project={p} />)}
            </div>

            {/* Work In Progress */}
            <SectionTitle>Work-in-Progress / Conceptual Projects</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wipProjects.map((p, i) => <ProjectCard key={i} project={p} />)}
            </div>

            {/* Repos */}
            <SectionTitle>Additional Repositories Worth checking out</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.map((p, i) => <ProjectCard key={i} project={p} />)}
            </div>

            {/* Learning */}
            <SectionTitle>Learning & Training</SectionTitle>
            <div className="space-y-4">
                {learning.map((l, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">{l.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{l.desc}</p>
                                {l.link && (
                                    <Button variant="link" asChild>
                                        <Link href={l.link} target="_blank">View</Link>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Technical Keywords */}
            <SectionTitle>Technical Keywords</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                {Object.entries(techKeywords).map(([cat, items]) => (
                    <Card key={cat} className="p-4">
                        <CardTitle className="text-base mb-2">{cat}</CardTitle>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {items.map((it, i) => <li key={i}>{it}</li>)}
                        </ul>
                    </Card>
                ))}
            </div>
        </div>
    )
}