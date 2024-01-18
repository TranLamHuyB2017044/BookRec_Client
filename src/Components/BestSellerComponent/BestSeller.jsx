import React from 'react'
// import sliderImg from '../../assets/bookStore.jpg'
import slider1 from '../../assets/slider_1.jpg'
import slider2 from '../../assets/slider_2.jpg'
import slider3 from '../../assets/slider_3.jpg'
import {Slide} from 'react-slideshow-image'


const slideImages = [slider1, slider2, slider3];

export default function BestSeller() {
  return (
    <div className='max-w-screen'>
      <Slide duration={8000}>
        {slideImages.map((slide, index) => (
            <div key={index}>
                <img className='flex items-center justify-center bg-cover h-[500px] rounded-xl w-full' src={slide} alt='slider-img'/>
            </div>
        ))}
      </Slide>
    </div>
  )
}
