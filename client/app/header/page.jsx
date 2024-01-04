'use client'
import { useEffect, useState } from 'react';
import handler from '../user/user';
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Header = () => {
    const [user, setUser] = useState(null);
    const [router, setRouter] = useState(usePathname() || '/');
    const isActive = (path) => router === path;
    const handler = (url) => setRouter(url);
    const route = useRouter();
    useEffect(() => {
        const fetchUserDetails = async () => {
            //  console.log('Fetching user data...');
            try {
                const response = await fetch('/api/auth/me');
                console.log(user);
                // setTimeout(() => { }, 10000);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                // console.log('User data:', data.email);
                //console.log(process.env.);
                setUser(data);
                if (!process.env.NEXT_PUBLIC_admins.includes(data.email)) {
                    router.push('/caution');
                }
                console.log(user);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };

        fetchUserDetails();
    }, [user]);

    return (
        <div className="header-2">
            <nav className="bg-white py-2 md:py-4">
                <div className="container px-4 mx-auto md:flex md:items-center">
                    <div className="flex justify-between items-center">
                        <a href="/"
                            className="font-bold text-xl text-indigo-600">
                            Admin
                        </a>
                        <button
                            className={`border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 bg-indigo-700 opacity-50 hover:opacity-50 md:hidden ${isActive('/') ? 'bg-indigo-700 text-white' : ''}`}
                            id="navbar-toggle"
                            style={{ height: '25px', width: '25px' }}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>

                    {!user ? (
                        <div className={`hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 bg-indigo-700 text-white`} id="navbar-collapse">
                            <a
                                href="/api/auth/login"
                                className="p-2 lg:px-4 md:mx-2 text-white-600 text-center border border-transparent rounded"
                            >
                                Login
                            </a>
                        </div>
                    ) : (
                        <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                            <a href="/"
                                onClick={() => handler('/')}
                                className={`p-2 lg:px-4 md:mx-2 rounded ${isActive('/') ? 'bg-indigo-700 text-white' : ''} `}>
                                Home
                            </a>
                            <a
                                href="/newcompanies"
                                onClick={() => handler('/newcompanies')}
                                className={`p-2 lg:px-4 md:mx-2 rounded ${isActive('/newcompanies') ? 'bg-indigo-700 text-white' : ''} `}
                            >
                                New Company
                            </a>
                            <a
                                href="/companies"
                                onClick={() => handler('/companies')}
                                className={`p-2 lg:px-4 md:mx-2 rounded ${isActive('/companies') ? 'bg-indigo-700 text-white' : ''} `}
                            >
                                Companies
                            </a>
                            <a
                                href="/api/auth/logout"
                                className={`p-2 lg:px-4 md:mx-2 rounded} `}
                            >
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
