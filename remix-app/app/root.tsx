import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import type {LinksFunction} from "@remix-run/node";

// import "./tailwind.css";
import {useState} from "react";

import styles from "./tailwind.css?url"

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <div className="flex flex-col h-screen">
            {/* Header with hamburger for mobile */}
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
                {/* Hamburger button (visible on mobile only) */}
                <button
                    className="block p-2 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
                <h1 className="text-lg"><Link to={"/"}>Dynamock</Link></h1>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                {isSidebarOpen &&
                    <aside
                        className={`bg-gray-700 text-white w-64 space-y-6 p-4 transform ${
                            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0 md:relative transition-transform duration-200 ease-in-out`}
                    >
                        <Link to={'/service'} className="block">Services</Link>
                        <Link to={'/keys._index.tsx'} className="block">Unique Keys</Link>
                        <Link to={'/mapping'} className="block">User Response Mappings</Link>
                    </aside>
                }

                {/* Main content area */}
                <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
        {/*{children}*/}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
