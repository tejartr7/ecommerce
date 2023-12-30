// Import necessary dependencies
'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function DeleteProductPage() {
    const path = usePathname();
    const id = path.substring(8);
    const router = useRouter();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        console.log(id);
        const getProductDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/addProduct/${id}`);
                console.log(res);
                if (res.status === 200) {
                    const data = res.data;
                    setProducts(data);
                    console.log(products);
                } else {
                    console.log('Error fetching product details');
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (id) {
            getProductDetails();
        }
    }, [id]);

    const deleteProduct = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/updateProduct/${id}`, {
                id: id,
            });
            if (res.status === 200) {
                console.log('Product deleted successfully');
                toast.success('Product deleted successfully', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });


                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                console.log('Error deleting product');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const goBack = () => {
        router.back(); // Go back to the previous page
    };

    return (
        <div className="flex items-center justify-center h-screen text-lg">
            <ToastContainer />
            <div className="text-center">
                <h1 className="mb-4">Do you really want to delete &nbsp;&quot;{products.title}&quot;?</h1>
                <div className="flex gap-2 justify-center">
                    <button onClick={deleteProduct} className="btn-red" style={{ width: '50px', borderRadius: '5px' }}>
                        Yes
                    </button>
                    <button className="btn-default" onClick={goBack} style={{ width: '50px', borderRadius: '5px' }}>
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
}
