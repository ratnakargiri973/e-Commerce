import React from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import useWishlist from '../hooks/useWishlist.jsx';


function ProductCard({product}) {
  const { toggleWishlist, isInWishlist, loading } = useWishlist();
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
        <button
         onClick={() => toggleWishlist(product._id)}
         className='bg-yellow-300 text-white px-2 py-1 rounded'
         disabled={loading}>
          {isInWishlist(product._id)
           ? "Remove from wishlist"
           : "Add to Wishlist" }
        </button>
      </div>
    </div>
  )
}

export default ProductCard
