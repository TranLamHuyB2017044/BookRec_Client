/* eslint-disable jsx-a11y/aria-role */
import React, { useRef, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux';
import { Exit, SignUp } from '../../store/userReducer.js';
import { LogoutCart } from '../../store/cartReducer.js';
import { PublicRequest } from '../../service/Request.js';
import myAlert from '../../Components/AlertComponent/Alert'
import Loading from '../../Components/LoadingComponent/Loading';
export default function Verify() {
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const schema = yup
        .object({
            oldPassword: yup.string().required("Vui lòng nhập mật khẩu cũ"),
            newPassword: yup.string().required("Vui lòng nhập mật khẩu mới").min(8),
            confirmPassword: yup.string().required("Vui lòng xác nhận lại mật khẩu mới").min(8),
        })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    const onLogin = (data) => console.log(data)

    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/account',
            label: 'Quản lý tài khoản'
        },
        {
            link: '/changepassword',
            label: 'Đổi mật khẩu'
        },

    ]

    const Logout = () => {
        window.location.href = 'http://localhost:5000/auth/logout';
        dispatch(Exit())
        dispatch(LogoutCart())
        window.localStorage.removeItem('persist:root')

    }
    const navigate = useNavigate()

    const inputRef = useRef(0)

    const sendEmail = async () => {
        try {
            const userInfo = {
                email: user.email,
                fullname: user.fullname
            }
            const rs = await PublicRequest.post('/user/verifyEmail', userInfo)
            if (rs.status === 200) {
                myAlert.Alert('success', 'Gửi mã xác nhận thành công, vui lòng kiểm tra tại email của bạn')
                return rs.data.verify
            }
        } catch (err) {
            console.log(err)
        }
    }
    const VerifyData = sendEmail()

    const verifyEmail = async () => {
        const verifyNumber = inputRef.current.value
        if (verifyNumber !== undefined) {
            if (VerifyData === parseInt(verifyNumber)) {
                setLoading(true)
                const verified = await PublicRequest.put('/user/verifyEmail', { email: user.email })
                console.log(verified)
                setTimeout(() => {
                    setLoading(false)
                    myAlert.Alert('success', 'Xác thực thành công')
                    navigate('/checkout')
                }, 2000)
            } else {
                myAlert.Alert('error', 'Mã xác nhận không đúng')
                return false
            }
        }



    }

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <div className='h-screen w-[1400px] mx-auto my-8 flex gap-32'>
                <div className='mt-[5rem] basis-1/4'>
                    <div className='flex items-center gap-1 text-4xl'>
                        <h1 className=''>Xin chào, </h1>
                        <h1 className='text-[#f47830]'>Trần Lâm Huy !</h1>
                    </div>
                    <ul className='mt-16 flex flex-col gap-5 '>
                        <Link to='/account' className='hover:text-[#f47830] cursor-pointer'>Thông tin tài khoản</Link>
                        <Link to='/yourOrders' className='hover:text-[#f47830] cursor-pointer'>Đơn hàng của bạn</Link>
                        <Link to='/verify' className='hover:text-[#f47830] cursor-pointer text-[#f47830]'>Đổi mật khẩu</Link>
                        <Link onClick={Logout} className='hover:text-[#f47830] cursor-pointer'>Đăng xuất</Link>

                    </ul>
                </div>
                <div className='mt-[5rem] basis-3/4'>
                    <h2 className='text-4xl'>XÁC THỰC EMAIL</h2>
                    <p className='mt-8 max-w-[45%]'>
                        Để đảm bảo tính bảo mật bạn vui lòng xác thực email.
                    </p>
                    <div>
                        <div className='mt-5 h-screen flex flex-col items-center '>
                            <div className='flex flex-col gap-4 items-center bg-blue text-3xl text-center'>
                                <p>Vui lòng nhập số đã được gửi qua email bạn để hoàn thành bước đăng ký. </p>
                                <input className='pl-2 border-black border w-[200px] h-[40px]' type="number" ref={inputRef} />
                                <div className='flex gap-4'>
                                    <button onClick={() => sendEmail()} className='border-[dodgerblue] px-8 py-2 border text-white bg-[dodgerblue] rounded-md' type='button'>Gửi mã</button>
                                    <button onClick={() => verifyEmail()} className='border-[#c04a4a] px-8 py-2 border text-white bg-[#e35353] rounded-md' type='button'>Kiểm tra</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
