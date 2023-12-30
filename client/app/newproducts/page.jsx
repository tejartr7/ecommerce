'use client';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../header/page'
import { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Page = () => {
    console.log("Component rendered");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const router = useRouter();
    async function handleSubmit(e) {
        // Add logic to handle form submission with the updated state values (title, description, and price)
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/addProduct', {
                title: title,
                description: description,
                price: price
            });
            if (response.status === 500) {
                toast.warn('Failed', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            else {
                toast.success('Product Added!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
        catch (error) {
            console.log(error);
            toast.warn('Failed', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        };
        setTitle('');
        setDescription('');
        setPrice('');
        setTimeout(() => {
            router.push('/products');
        }, 3000);
    }
    return (
        <div>
            <ToastContainer />
            <Header />
            <h1 className="text-3xl text-center font-bold mb-8">Add New Product</h1>
            <div className="w-full flex items-center justify-center">
                <form className="form-div bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-name">
                            Product Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="product-name"
                            type="text"
                            placeholder="Product Name"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Product Description
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price (In USD)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="text"
                            placeholder="Price (in USD)"
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-indigo-700 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Page;
