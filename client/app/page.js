'use client';
import Image from 'next/image';
import Header from './header/page';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  var currentDate = new Date();

  useEffect(() => {
    const removeProductFromDatabase = async (productId) => {
      try {
        await axios.delete(`https://admin-dashboard-s3ji.onrender.com/updateProduct/${productId}`);
      } catch (error) {
        console.log(error);
      }
    };

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
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold my-8">Companies hiring now!!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key='product._id' class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] m-4">
              <img class="w-full h-auto rounded-t-xl" src={product.image} alt="Image Description"/>
                <div class="p-4 md:p-5">
                  <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                    {product.title}
                  </h3>
                  <p class="mt-1 text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>
                  <a class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" target='_blank' href={product.link}>
                    Apply Now
                  </a>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
