// Import necessary dependencies
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Header from '@/app/header/page';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';

// Create the functional component
const Page = () => {
  // Get the router object
  const router = usePathname();
  const id = router.substring(6);
  const route = useRouter();
  // State variables to hold product details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  // Use useEffect to fetch product details when the component mounts
  useEffect(() => {
    // Function to fetch product details by ID
    const getProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/addProduct/${id}`);
        if (res.status === 200) {
          const data = res.data;
          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price);
          setUrl(data.image);
          //console.log(data);
        } else {
          console.log('Error fetching product details');
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Check if 'id' is available before fetching details
    if (id) {
      getProductDetails();
    }
  }, [id]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("File not found");
    } else {
      console.log(file.name);
      setImage(file);
    }
  };
  // Function to handle form submission and update product details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the product
      const res = await axios.put(`http://localhost:8000/updateProduct/${id}`, {
        title: title,
        description: description,
        price: price,
        id: id,
        image: image,
        url: url,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        console.log('Product updated successfully');
        toast.success('Product updated successfully', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.log('Error updating product');
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
    } catch (error) {
      console.error(error);
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
    setTimeout(() => {
      route.push("/products");
    }, 3000);
  };

  // JSX structure for the component
  return (
    <div>
      <ToastContainer />
      <Header />
      <h1 className="text-3xl text-center font-bold mb-8">Edit</h1>
      <div className="w-full flex items-center justify-center">
        <form
          className="form-div bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
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
              onChange={(e) => {
                setTitle(e.target.value);
              }}
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
          <div className='flex items-center justify-center m-2'>
            <img src={url} alt='image' style={{ width: '30%', height: '30vh' }} />
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
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-indigo-700 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the component as the default export
export default Page;
