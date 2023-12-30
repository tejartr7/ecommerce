'use client'
import { useEffect, useState } from 'react';
import handler from '../user/user';

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
          //  console.log('Fetching user data...');
            try {
                const response = await fetch('/api/auth/me');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
              //  console.log('User data:', data);
                setUser(data);
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
                        <a href="#" className="font-bold text-xl text-indigo-600">
                            FWR
                        </a>
                        <button
                            className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 bg-indigo-700 opacity-50 hover:opacity-50 md:hidden"
                            id="navbar-toggle"
                            style={{ height: '25px', width: '25px' }}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>

                    {!user ? (
                        <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                            <a
                                href="/api/auth/login"
                                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
                            >
                                Login
                            </a>
                        </div>
                    ) : (
                        <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                            <a href="/" className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">
                                Home
                            </a>
                            <a
                                href="/dashboard"
                                className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                            >
                                DashBoard
                            </a>
                            <a
                                href="/products"
                                className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                            >
                                Products
                            </a>
                            <a
                                href="/profile"
                                className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                            >
                                Profile
                            </a>
                            <a
                                href="/api/auth/logout"
                                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
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
