// import React, { useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Footer from '../../Components/FooterComponent/Footer'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from 'react-redux'
import { PublicRequest } from '../../service/Request';
import { SignIn } from '../../store/userReducer';
import MyAlert from '../../Components/AlertComponent/Alert'
import { useEffect, useState } from 'react';
import Loading from '../../Components/LoadingComponent/Loading';
export default function Login() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'BookRec - Login'
  },[])

  const OauthLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };
  const onLogin = async (data) => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const user = await PublicRequest.post('/user/login', data)
        dispatch(SignIn(user.data))
        MyAlert.Toast('success', 'Login successfully')
        setLoading(false)
      } catch (error) {
        MyAlert.Alert('error', error.response.data)
        setLoading(false)
      }
    }, 2000)
  }
  const enterLogin = async (e) => {
    if (e.key === 'enter') {
      onLogin()
    }
  }
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email is required")
        .email("email must be mail@example.com"),
      password: yup.string().required("Password is require").min(3),
    })
    .required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })
  return (
    <div >
      <Navbar />
      {loading === true ? <Loading />
        : <div className='flex flex-col items-center justify-center mb-24 s:mb-[21rem]'>
          <div className='h-[200px] relative s:hidden md:hidden lg:block'>
            <img  src="https://bizweb.dktcdn.net/100/197/269/themes/890698/assets/bg_breadcrum.jpg?1704543895805" alt="breakcum-img" />
            <h2 className='text-[#f47830] text-5xl absolute top-20 left-[470px]'>Không có gì có thể thay thế văn hóa đọc</h2>
          </div>
          <div className='form-container lg:w-[500px] lg:mt-0 border border-[#f47830] s:w-[400px] s:h-fit md:mt-20'>
            <form onSubmit={handleSubmit(onLogin)} className='p-8 flex flex-col items-center '>
              <div className='flex items-center justify-center p-8 cursor-pointer text-3xl'>
                <Link to='/login' className='hover:text-[#f47830] mx-2' >Đăng nhập </Link>
                |
                <Link to='/register' className='mx-2 hover:text-[#f47830]' >Đăng ký</Link>
              </div>
              <div className='flex flex-col my-6'>
                <label htmlFor="email " className='text-[#616161] font-bold'>Email</label>
                <input className={` pl-2 lg:w-[420px] s:w-[320px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.email ? 'border-[#ff0000]' : 'border-[#ccc]'}`} type='email' id="email" {...register("email", { required: true })} />
                <p className='text-red-600'>{errors.email?.message}</p>
              </div>
              <div className='flex flex-col my-6'>
                <label htmlFor="Password " className='text-[#616161] font-bold'>Mật Khẩu</label>
                <input className={` pl-2 lg:w-[420px] h-[42px] s:w-[320px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.password ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="Password" {...register("password", { required: true })} type="password" />
                <p className='text-red-600'>{errors.password?.message}</p>
              </div>

              <button className='flex flex-col mt-6 h-[42px] bg-[#f47830] hover:bg-[#c27952] lg:w-[420px] rounded-lg justify-center items-center cursor-pointer font-bold text-white s:w-[320px]' type='submit' onKeyDown={enterLogin}>ĐĂNG NHẬP</button>

            </form>
            <div className='flex items-center justify-center gap-6'>
              <div className='bg-[#ccc] lg:w-40 s:w-20 h-[1px]'></div>
              <p className='text-[#818080]'>Hoặc đăng nhập bằng</p>
              <div className='bg-[#ccc] lg:w-40 s:w-20 h-[1px]'></div>
            </div>
            <div className='text-white cursor-pointer flex item-center justify-center p-5 gap-5 mt-4'>
              <button onClick={OauthLogin} className='flex items-center justify-center bg-[#e14b33] gap-3 p-3 w-full hover:bg-[#b86154] rounded-lg'>
                <GoogleIcon fontSize='large' />
                <p>Google</p>
              </button>
            </div>
            {/* <div className='flex gap-2 items-center justify-center my-[1rem]'>Bạn quên mật khẩu <p className='text-[#4c80ee] cursor-pointer'>bấm vào đây.</p></div> */}
          </div>
        </div>}
      <Footer />
    </div>
  )
}
