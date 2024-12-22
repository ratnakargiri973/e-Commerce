import React, { useEffect, useState } from 'react'
import instance from '../axiosConfig';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(){
    try {
      const response = await instance.get("/product/get");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  return (
    <div className='w-full flex justify-around items-start gap-4 p-8 flex-wrap'>
      {products.length > 0 &&
        products.map((product) => {
          return <ProductCard product={product} key={product.uid}/>
        })

      }

    </div>
  )
}

export default Home
