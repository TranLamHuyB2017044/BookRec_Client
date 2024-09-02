import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Exit } from '../../store/userReducer'
import { LogoutCart } from '../../store/cartReducer'
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs'
import Navbar from '../../Components/NavBarComponent/Navbar'
import { Link } from 'react-router-dom'

export default function Contact() {

    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'BookRec - Contact'
    }, [])
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
            link: '/contact',
            label: 'Trung tâm hỗ trợ'
        },

    ]

    const Logout = () => {
        window.location.href = 'http://localhost:5000/auth/logout';
        dispatch(Exit())
        dispatch(LogoutCart())
        window.localStorage.removeItem('persist:root')

    }

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <div className='lg:h-screen lg:w-[1400px] s:h-fit mx-auto my-8 flex md:flex-row s:flex-col s:w-full gap-32 '>
                <div className='mt-[5rem] basis-1/4'>
                    <div className='flex items-center gap-1 text-4xl'>
                        <h1 className=''>Xin chào, </h1>
                        <h1 className='text-[#f47830]'>{user.fullname} !</h1>
                    </div>
                    <ul className='mt-16 flex md:flex-col sm:flex-row sm:gap-10 sm:overflow-x-auto gap-5 '>
                        <Link to='/account' className='hover:text-[#f47830] cursor-pointer'>Thông tin tài khoản</Link>
                        <Link to='/yourOrders' className='hover:text-[#f47830] cursor-pointer'>Đơn hàng của bạn</Link>
                        <Link to='/verifyAccount' className='hover:text-[#f47830] cursor-pointer '>Xác thực email</Link>
                        <Link to='/contact' className='hover:text-[#f47830] cursor-pointer text-[#f47830]'>Trung tâm hỗ trợ</Link>
                        <Link onClick={Logout} className='hover:text-[#f47830] cursor-pointer'>Đăng xuất</Link>
                    </ul>
                </div>
                <div className='md:mt-[5rem] s:mt-5 basis-3/4 px-8'>
                    <h2 className='text-4xl'>LIÊN HỆ</h2>
                    <div className='flex justify-start items-start s:gap-16 md:gap-48 mt-24 s:flex-col md:flex-row'>
                        <div className=''>
                            <p>Địa chỉ:</p>
                            <p className='text-gray-400'>11B Hòa Bình, Cần Thơ, 94000, Việt Nam</p>
                        </div>
                        <div className=''>
                            <p>Email:</p>
                            <a className='text-gray-400' href="mailto:tranlamhuy5tn@gmail.com?subject=Hello&body=This%20is%20a%20test%20email.">tranlamhuy5tn@gmail.com</a>

                        </div>
                        <div className=''>
                            <p>Điện thoại:</p>
                            <a className='text-gray-400' href="tel:0123456789">0123456789</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
