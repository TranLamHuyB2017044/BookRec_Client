import React, { useRef, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Footer from '../../Components/FooterComponent/Footer'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { PublicRequest } from '../../service/Request';
import myAlert from '../../Components/AlertComponent/Alert'
import Loading from '../../Components/LoadingComponent/Loading';
import { useDispatch } from 'react-redux';
import { SignUp } from '../../store/userReducer';

export default function Register() {
  const [newUser, setNewUser] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const OauthLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };
  const schema = yup
    .object({
      fullname: yup.string().required("Username is required").min(3),
      email: yup
        .string()
        .required("Email is required")
        .email("email must be mail@example.com"),
      phone: yup.string().required('Phone number is required'),
      address: yup.string(),
      password: yup.string().required("Password is require").min(3),
    })
    .required();

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [responseData, setResponseData] = useState({})
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  })

  const onChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const onRegister = async (data) => {

    try {
      const rs = await PublicRequest.post('/user/register', data)
      setResponseData(rs)
      if (rs.status === 200) {
        window.scroll(0, 0)
        setVerifying(true)
        await verifyRegister(rs)
      }
    } catch (error) {
      myAlert.Alert('error', error.response.data)
      setLoading(false)
    }
  }

  const onEnterRegister = async (e) => {
    if (e.key === 'Enter') {
      onRegister()
    }
  }
  const inputRef = useRef(0)


  const verifyRegister = async (rs) => {
    const verifyNumber = inputRef.current.value
    if (verifyNumber !== undefined) {
      if (rs.data.verify === parseInt(verifyNumber)) {
        setLoading(true)
        console.log(rs.data.others.email)
        const verified = await PublicRequest.put('/user/verifyEmail', {email: rs.data.others.email})
        console.log(verified)
        setTimeout(() => {
          dispatch(SignUp(rs.data.others))
          setLoading(false)
          myAlert.Alert('success', 'Đăng ký thành công')
          navigate('/login')
        }, 2000)
      } else {
        myAlert.Alert('error', 'Mã xác nhận không đúng')
        return false
      }
    }
  }

  const handleCancel = () => {
    myAlert.Toast('info', 'Email của bạn chưa được xác thực')
    navigate('/login')
  }
  return (
    <div>
      <Navbar />
      {loading === false ? <div style={verifying ? { display: 'none' } : { display: 'flex' }} className='flex flex-col items-center justify-center mb-24'>
        <div className='h-[200px] relative'>
          <img src="https://bizweb.dktcdn.net/100/197/269/themes/890698/assets/bg_breadcrum.jpg?1704543895805" alt="breakcum-img" />
          <h2 className='text-[#f47830] text-5xl absolute top-20 left-[470px]'>Xem sách là một cách thưởng thức nghệ thuật.</h2>
        </div>
        <div className='form-container w-[500px] border border-[#f47830] '>
          <form onSubmit={handleSubmit(onRegister)} className='p-8 flex flex-col items-center '>
            <div className='flex items-center justify-center p-8 cursor-pointer text-3xl'>
              <Link to='/login' className='hover:text-[#f47830] mx-2' >Đăng nhập </Link>
              |
              <Link to='/register' className='mx-2 hover:text-[#f47830]' >Đăng ký</Link>
            </div>
            <div className='flex flex-col my-6'>
              <label htmlFor="fullname" className='text-[#616161] font-bold'>Họ và tên</label>
              <input className={`pl-2 w-[420px] h-[42px] border outline-[#ccc] my-3 rounded-lg focus:outline-none ${errors.fullname ? 'border-[#ff0000]' : 'border-[#ccc]'}`} type='text' id="fullname" {...register("fullname", { require: true })} onChange={onChange} />
              <p className='text-red-600'>{errors.fullname?.message}</p>
            </div>
            <div className='flex flex-col my-6'>
              <label htmlFor="phone " className='text-[#616161] font-bold'>Số điện thoại</label>
              <input className={`pl-2 w-[420px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.phone ? 'border-[#ff0000]' : 'border-[#ccc]'}`} type='phone' id="phone" {...register("phone", { require: true })} onChange={onChange} />
              <p className='text-red-600'>{errors.phone?.message}</p>
            </div>
            <div className='flex flex-col my-6'>
              <label htmlFor="email " className='text-[#616161] font-bold'>Email</label>
              <input className={`pl-2 w-[420px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.email ? 'border-[#ff0000]' : 'border-[#ccc]'}`} type='email' id="email" {...register("email", { require: true })} onChange={onChange} />
              <p className='text-red-600'>{errors.email?.message}</p>
            </div>
            <div className='flex flex-col my-6'>
              <label htmlFor="Password " className='text-[#616161] font-bold'>Mật Khẩu</label>
              <input className={`pl-2 w-[420px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.password ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="password" {...register("password", { require: true })} type="password" onChange={onChange} />
              <p className='text-red-600'>{errors.password?.message}</p>
            </div>

            <button className='font-bold text-white flex flex-col mt-6 h-[42px] bg-[#f47830] hover:bg-[#c27952] w-[420px] rounded-lg justify-center items-center ' type='submit' onKeyDown={onEnterRegister}>ĐĂNG KÝ</button>

          </form>
          <div className='flex items-center justify-center gap-6'>
            <div className='bg-[#ccc] w-40 h-[1px]'></div>
            <p className='text-[#818080]'>Hoặc đăng nhập bằng</p>
            <div className='bg-[#ccc] w-40 h-[1px]'></div>
          </div>
          <div className='text-white cursor-pointer flex item-center justify-center p-5 gap-5 mt-4 mb-5'>
            <div className='flex items-center justify-center bg-[#3b5998]  gap-3 p-3 w-52 hover:bg-[#3d4b6a]'>
              <FacebookOutlinedIcon fontSize='large' />
              <p>Facebook</p>
            </div>
            <div className='flex items-center justify-center bg-[#e14b33] gap-3 p-3 w-52 hover:bg-[#b86154]'>
              <GoogleIcon fontSize='large' />
              <button onClick={OauthLogin}>Google</button>
            </div>
          </div>
        </div>
      </div>
        : <Loading />}
      {verifying &&
        <div className='h-screen flex flex-col items-center '>
          <div className='flex flex-col gap-4 items-center bg-blue text-3xl text-center'>
            <p>Vui lòng nhập số đã được gửi qua email bạn để hoàn thành bước đăng ký. </p>
            <input  className='pl-2 border-black border w-[200px] h-[40px]' type="number" ref={inputRef} />
            <button onClick={() => verifyRegister(responseData)} className='border-[dodgerblue] px-12 py-2 border text-white bg-[dodgerblue] rounded-md' type='button'>Gửi</button>
            <button onClick={handleCancel}  className='text-center text-[dodgerblue]'>Trở về ?</button>
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}
