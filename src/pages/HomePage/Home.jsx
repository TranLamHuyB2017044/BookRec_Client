import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Slider from '../../Components/SliderComponent/Slider'
import Introduce from '../../Components/IntroduceComponent/Introduce'
import Footer from '../../Components/FooterComponent/Footer'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Introduce/>
      <Footer/>
    </div>
  )
}
