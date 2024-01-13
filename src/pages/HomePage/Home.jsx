import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Slider from '../../Components/SliderComponent/Slider'
import Introduce from '../../Components/IntroduceComponent/Introduce'
import Footer from '../../Components/FooterComponent/Footer'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Introduce/>
      <Footer/>
      <GoToTop/>
    </div>
  )
}
