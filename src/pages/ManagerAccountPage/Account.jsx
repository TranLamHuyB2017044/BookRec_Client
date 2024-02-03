/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
// import { books_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';

import { Link } from 'react-router-dom';
import  Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Exit } from '../../store/userReducer.js';
export default function Account() {
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/account',
            label: 'Quản lý tài khoản'
        }

    ]

    // const book_empty = []
    const Logout = () => {
        window.location.href = 'http://localhost:5000/auth/logout';
        dispatch(Exit())
        window.localStorage.removeItem('persist:root')
    }

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs}/>
            <div className='h-screen w-[1400px] mx-auto my-8 flex gap-32'>
                <div className='mt-[5rem] basis-1/4'>
                    <div className='flex items-center gap-1 text-4xl'>
                        <h1 className=''>Xin chào, </h1>
                        <h1 className='text-[#f47830] ml-2'> {user.fullname} !</h1>
                    </div>
                    <ul className='mt-16 flex flex-col gap-5 '>
                        <Link to='/account' className='hover:text-[#f47830] cursor-pointer text-[#f47830]'>Thông tin tài khoản</Link>
                        <Link to='/yourOrders' className='hover:text-[#f47830] cursor-pointer'>Đơn hàng của bạn</Link>
                        <Link to='/changepassword' className='hover:text-[#f47830] cursor-pointer'>Đổi mật khẩu</Link>
                        <Link onClick={Logout} className='hover:text-[#f47830] cursor-pointer'>Đăng xuất</Link>
                    </ul>
                </div>
                <div className='mt-[5rem] basis-3/4'>
                    <h1 className='text-4xl'>THÔNG TIN TÀI KHOẢN</h1>
                    <div className='mt-16 flex flex-col gap-8'>
                        <div className='flex items-center gap-3'>
                            <p className='font-bold'>Họ tên: </p>
                            <p className='opacity-80'>{user.fullname}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='font-bold'>Email: </p>
                            <p className='opacity-80'>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
