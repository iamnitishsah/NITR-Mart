import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Metadata for SEO and social sharing
export const metadata: Metadata = {
    title: "NITR Mart",
    description: "NIT Rourkela's student marketplace — buy, sell, connect.",
    icons: {
        icon: "/logo.png",
    },
    openGraph: {
        title: "NITR Mart",
        description: "NIT Rourkela's student marketplace — buy, sell, connect.",
        images: [
            {
                url: "/logo.png",
                width: 800,
                height: 600,
                alt: "NITR Mart Logo",
            },
        ],
        type: "website",
        locale: "en_US",
        siteName: "NITR Mart",
    },
    twitter: {
        card: "summary_large_image",
        title: "NITR Mart",
        description: "Buy, sell and connect at NIT Rourkela.",
        images: ["/logo.png"],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
