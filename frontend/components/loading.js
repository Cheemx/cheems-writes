"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const facts = [
    "MongoDB stores data in BSON, a binary form of JSON.",
    "HTTP status code 418 means 'I'm a teapot' — an April Fool's joke.",
    "REST is stateless — every request carries all needed context.",
    "Node.js uses the same V8 engine as Chrome.",
    "Go (Golang) was developed at Google by Ken Thompson and team.",
    "Redis is lightning-fast because it runs in memory.",
    "Docker containers share OS kernel but isolate processes.",
    "GraphQL lets clients ask only for the data they need.",
    "JWTs are a popular method for stateless authentication.",
    "TLS is the real encryption behind HTTPS.",
    "A load balancer helps distribute traffic evenly.",
    "OAuth 2.0 is the industry standard for authorization.",
    "The internet backbone is built on undersea fiber cables.",
    "WebSockets allow bidirectional communication between client and server.",
    "DNS maps human-friendly domains to IP addresses.",
    "Reverse proxies like NGINX improve security and speed.",
    "Microservices split apps into independently deployable services.",
    "CAP Theorem: choose two—Consistency, Availability, Partition tolerance.",
    "Blue-green deployment enables zero downtime updates.",
    "info.cern.ch is the first website ever created.",
    "Git was built by Linus Torvalds, who also built Linux.",
    "JSON stands for JavaScript Object Notation.",
    "HTTP/3 uses QUIC protocol built over UDP.",
    "APIs can be public, private, or partner-only.",
    "Frontend and backend communication often happens over REST or GraphQL.",
    "The first computer bug was an actual moth in a relay.",
    "JavaScript developers spend 80% of their time fixing bugs, 20% creating new ones.",
    "Writing console.log('why') is modern developer therapy.",
    "Tabs vs Spaces started more wars than world politics.",
    "Your code works until someone asks, 'Why does this work?'",
    "The cloud is just someone else's computer... seriously.",
    "AI won't replace you unless you're copy-pasting Stack Overflow.",
    "We style loading screens longer than users see them.",
    "Hardest part of coding? Naming things and cache invalidation.",
    "CSS was invented to test your patience, not layout websites.",
    "Semicolons: tiny symbols, huge potential for chaos.",
    "Every TODO comment is a lie you told yourself.",
    "'Works on my machine' is not a valid deployment strategy.",
    "Stack Overflow going down increases dev productivity 2x.",
    "Rubber ducks are cheaper than debugging tools — and more effective.",
    "Deleting node_modules fixes everything. Including your sanity.",
    "Fullstack devs are just backend devs forced to use CSS.",
    "Doom runs on a fridge, but not your company laptop.",
    "You copy-paste Stack Overflow code. Then you pray.",
    "Every software was 'legacy' five minutes after deployment.",
    "Dark mode increases productivity. Allegedly.",
    "Quick fixes outlive your longest relationship.",
    "Production is where staging fears to tread."
];


const LoadingDidYouKnow = () => {
    const [fact, setFact] = useState("");

    useEffect(() => {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setFact(randomFact);
    }, []);

    return (
        <div className="w-full h-screen flex items-center justify-center p-4">
            <Card className="bg-background/90 backdrop-blur-md shadow-xl border border-border max-w-xl w-full text-center">
                <CardHeader className="flex flex-col items-center space-y-4">
                    {/* Centered spinner */}
                    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <CardTitle className="text-2xl font-bold">Did You Know?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">{fact}</p>
                    <div className="mt-4">
                        <Badge variant="outline" className="py-1">Just a fun fact while loading…</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoadingDidYouKnow;
