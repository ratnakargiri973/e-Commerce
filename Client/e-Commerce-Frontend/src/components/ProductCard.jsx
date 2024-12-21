import React from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";


function ProductCard({product}) {
  return (
    <div className="w-1/6 h-78 flex flex-col shadow-md bg-zinc-400 rounded-xl pb-4">
      <div className="w-full h-1/2 rounded-xl">
        <img src={product.image} alt="Product Image" className='w-full h-64 rounded-t-xl'/>
      </div>
      <div className="w-full h-1/2 flex flex-col justify-around items-center">
        <h3 className='font-bold text-xl'>{product.name}</h3>
        <p>{product.brand}</p>
        <p className="price flex justify-center items-center">
          <LiaRupeeSignSolid /> {product.price}
        </p>
        <Link to="" className='p-2 bg-yellow-300 rounded-lg hover:bg-yellow-200'>
          Add To Cart
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
