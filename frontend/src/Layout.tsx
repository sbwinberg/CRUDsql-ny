import { MountainIcon } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <header style={{ backgroundColor: '#3498db', color: 'white', padding: '1rem' }}>
                <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <MountainIcon className="h-6 w-6" />
                        <span className="text-lg font-semibold">Gbg Marketing</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Logga in
                        </Link>
                        <Link
                            to="/register"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Registrera
                        </Link>
                        <Link
                            to="/campaign"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Campaigns
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer style={{ backgroundColor: '#3498db', color: 'white', padding: '1rem', textAlign: 'center' }}>
                <p className="text-xs text-muted-foreground">
                    &copy; 2024 Gbg Marketing. All rights reserved.
                </p>
                {/* 
                // vad ska vi med dessa? / Jens
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link to="#" className="text-xs hover:underline underline-offset-4">
                        Terms of Service
                    </Link>
                    <Link to="#" className="text-xs hover:underline underline-offset-4">
                        Privacy
                    </Link>
                </nav>
                 */}
            </footer>
        </div>
    );
};

export default Layout;
