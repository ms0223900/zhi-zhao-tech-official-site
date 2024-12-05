import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About page",
};

export default function About() {
    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">About Page</h1>
            <p>This is the about page content.</p>
        </div>
    );
} 