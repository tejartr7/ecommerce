'use client';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../header/page'
import { useState,useEffect} from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ReactSortable } from 'react-sortablejs';
import Spinner from './Spinner';
import Autosuggest from 'react-autosuggest';
const Page = () => {
    // console.log("Component rendered");
    const [user, setUser] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const router = useRouter();
    const [image, setImage] = useState([]);
    const [link, setLink] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');
    const categories = ['internship', 'fte', 'fresher', 'experience'];
    const [selectedCategory, setSelectedCategory] = useState('internship');
    const [suggestions, setSuggestions] = useState([]);
    const currentDate = new Date();
    const [startDate, setStartDate] = useState(currentDate);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 7);
    //console.log(startDate);
    //console.log(endDate);
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
    async function handleSubmit(e) {
        e.preventDefault();
        if (title == '' || description == '' || price == '' || link == '' || category == '' || (image == '' && url == '')) {
            return toast.warn('Please fill all the fields', {
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
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('category', category);
        formData.append('url', url);
        formData.append('link', link);
        try {
            console.log(formData);
            const response = await axios.post('https://admin-dashboard-s3ji.onrender.com/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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
        setImage(null);
        setCategory('');
        setTimeout(() => {
            router.push('/companies');
        }, 3000);
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return console.log('File not found');
        if (file.length == 1)
            return uploadSingleImage();
        return uploadMultipleImages();
    };
    const onSuggestionsFetchRequested = ({ value }) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        setSuggestions(
            inputLength === 0
                ? []
                : categories.filter((category) =>
                    category.toLowerCase().includes(inputValue)
                )
        );
    };
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => suggestion;

    const renderSuggestion = (suggestion) => (
        <div className="suggestion-item">
            {suggestion}
        </div>
    );
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-name">
                            Category
                        </label>
                        <Autosuggest
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-control"
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={{
                                placeholder: 'Category',
                                value: category,
                                onChange: (event, { newValue }) => setCategory(newValue),
                            }}
                            theme={{
                                container: 'autosuggest-container',
                                suggestionsContainer: 'suggestions-container',
                                suggestionsList: 'suggestions-list',
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product-name">
                            Job Link
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="product-name"
                            type="text"
                            placeholder="Apply link"
                            value={link}
                            onChange={(e) => { setLink(e.target.value) }}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description" >Image</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                        />

                    </div>
                    <div className='text-center'>
                        <p className='para-center font-bold text-4xl '>(or)</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Image URL
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="text"
                            placeholder="Image url"
                            value={url}
                            onChange={(e) => { setUrl(e.target.value) }}
                        /></div>
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
                            Stipend/Salary(In USD)
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
            </div >
        </div >
    );
}
export default Page;