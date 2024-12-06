import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems'


const LatestCollection = () => {

const {products } = useContext(ShopContext);
const [LatestProducts , setLatestProducts] =useState([])

useEffect(()=>{
  products.filter((items) => (items.LatestProducts));
  setLatestProducts(products.slice(0,10));
},[])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
         <Title text1={'LATEST'} text2={'COLLECTION'} />
         <p className='w-3/4 m-auto text-sm sm:text-sm md:text-base font-serif text-gray-600'>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
         </p>
      </div>
      


      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6'>
      {
          LatestProducts.map((items,index)=>(
                <ProductItems key={index} id={items._id} name={items.name} image={items.image} price={items.price}/>
            ))
        }
      </div>
      
    </div>
  )
}

export default LatestCollection
