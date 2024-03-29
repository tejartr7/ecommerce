'use client';
import Link from "next/link"
import Header from "../header/page"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Page = () => {
    const [products, setProducts] = useState([]);
    const [user,setUser]=useState(null);
    var currentDate = new Date();
    const router=useRouter();
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
                if (!process.env.NEXT_PUBLIC_admins.includes(data.email)) {
                    router.push('/caution');
                }
                setUser(data);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
                router.push('/caution');
            }
        };

        fetchUserDetails();
    }, [user]);
   // console.log(currentDate);
    const removeProductFromDatabase = async (productId) => {
        try {
            const res = await axios.delete(`https://admin-dashboard-s3ji.onrender.com/updateProduct/${productId}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('https://admin-dashboard-s3ji.onrender.com/addProduct');
                if (res.status === 200) {
                    const data = res.data;
                    // Filter out products with endDate in the past
                    const filteredProducts = data.filter(product => new Date(product.endDate) > currentDate);
                    setProducts(filteredProducts);
                    data.forEach(async (product) => {
                        if (new Date(product.endDate) < currentDate) {
                            await removeProductFromDatabase(product._id);
                        }
                    });
                } else {
                    console.log('Error fetching products from the database.');
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [currentDate]);
    return (
        <div>
            <Header />
            <h1 className="flex items-center justify-center "><Link className="bg-indigo-700 text-white text-lg p-5" href={'/newproducts'} style={{ borderRadius: '10px' }}
            >Add new product</Link>
            </h1>
            <div className="flex items-center justify-center text-center text-lg">
                <div className="table-data flex items-center justify-center m-4 p-4">
                    <table className="basic w-full bg-white rounded-sm shadow-md mt-2">
                        <thead>
                            <tr className="text-lg font-bold">
                                <td>Product name</td>
                                <td>Options</td>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product.title}</td>
                                    <td>
                                        <Link className="btn-default m-2 bg-indigo-700" href={`/edit/${product._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            Edit
                                        </Link>
                                        <Link className="btn-red" href={'/delete/' + product._id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Page