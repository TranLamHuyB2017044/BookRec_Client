import React from 'react'
// import sliderImg from '../../assets/bookStore.jpg'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {Slide} from 'react-slideshow-image'
import { books_data } from '../../data.jsx'
import { Link } from 'react-router-dom';


export default function BestSeller() {
  return (
    <div className='max-w-screen mt-8 bg-[#fff8f2] py-5 h-[500px]'>
      <h1 className='text-5xl font-bold text-center'>Sách dành cho bạn</h1>
      <div className='flex items-center justify-center my-5'>
        <div className='bg-gray-400 h-[1px] w-[100px] mx-8'></div>
        <AutoStoriesIcon fontSize='large'/>
        <div className='bg-gray-400 h-[1px] w-[100px] mx-8'></div>
      </div>
      <Slide slidesToShow={7} indicators={true}>
        {books_data.map((slide, index) => (
            <Link to={`/collections/${index}`} key={index} className='mt-16 '>
                <img className='w-[200px]  border h-[250px] p-2 mb-4 rounded-md cursor-pointer shadow transform transition-transform duration-300 hover:scale-110 ' src={slide.url} alt='slider-img'/>
            </Link>
        )).slice(-12)}
      </Slide>
    </div>
  )
}
