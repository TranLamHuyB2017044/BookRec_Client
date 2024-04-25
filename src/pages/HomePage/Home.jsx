import React, { useEffect} from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Slider from '../../Components/SliderComponent/Slider'
import Introduce from '../../Components/IntroduceComponent/Introduce'
import Footer from '../../Components/FooterComponent/Footer'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import Quote from '../../Components/QuoteComponent/Quote.jsx'
import BestSeller from '../../Components/BestSellerComponent/BestSeller.jsx'
import { useDispatch } from 'react-redux'
import { OauthRequest } from '../../service/Request.js'
import { SignIn } from '../../store/userReducer.js'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async () => {
      try {
        const rs = await OauthRequest.get('/auth/google/success')
        dispatch(SignIn(rs.data))
      } catch (error) {
        console.log(error.message)
      }
    }
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])
  
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Introduce/>
      <BestSeller />
      <Quote/>
      <Footer/>
      <GoToTop/>
    </div>
  )
}
