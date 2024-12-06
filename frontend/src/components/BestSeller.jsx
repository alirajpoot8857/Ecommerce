import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const BestSeller = () => {
  
    const {products} = useContext(ShopContext)
    const [bestSeller , setBestSeller] = useState([])

   useEffect(()=>{
       products.filter((items) => (items.bestSeller));
      setBestSeller(products.slice(0, 5));
   },[])


   const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1200, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2
    }
  };

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLER'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
      </div>
   {/* {products} */}
     
      <div>
<Carousel
        responsive={responsive}
        arrows ={false}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        autoPlaySpeed={100} 
        // showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {bestSeller.map((items, index) => {
          return (
            <div className="slider px-2" key={index}>
              <ProductItems key={index} id={items._id} name={items.name} image={items.image} price={items.price} />
            </div>
          );
        })}
      </Carousel>
      </div>
      
    </div>
  )
}

export default BestSeller
