/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import { order_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';

import { Link } from 'react-router-dom';
import  Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
export default function YourOrder() {

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
            link: '/yourOrders',
            label: 'Đơn hàng'
        },

    ]

    const empty_order = []

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs}/>
            <div className='h-screen w-[1400px] mx-auto my-8 flex gap-32'>
                <div className='mt-[5rem] basis-1/4'>
                    <div className='flex items-center gap-1 text-4xl'>
                        <h1 className=''>Xin chào, </h1>
                        <h1 className='text-[#f47830]'>Trần Lâm Huy !</h1>
                    </div>
                    <ul className='mt-16 flex flex-col gap-5 '>
                        <Link to='/account' className='hover:text-[#f47830] cursor-pointer'>Thông tin tài khoản</Link>
                        <Link to='/yourOrders' className='hover:text-[#f47830] cursor-pointer text-[#f47830]'>Đơn hàng của bạn</Link>
                        <Link to='/changepassword' className='hover:text-[#f47830] cursor-pointer'>Đổi mật khẩu</Link>
                        <Link to='' className='hover:text-[#f47830] cursor-pointer'>Đăng xuất</Link>
                    </ul>
                </div>
                <div className='mt-[5rem] basis-3/4'>
                    <h1 className='text-4xl'>Đơn hàng của bạn</h1>
                    <div className='grid grid-cols-6 bg-[#f47830] text-white px-4 py-2 mt-16'>
                        <p className='col-span-2'>Đơn hàng</p>
                        <p className='col-span-1 w-[60%]'>Ngày</p>
                        <p className='col-span-1'>Địa chỉ</p>
                        <p className='col-span-1'>Giá trị đơn hàng</p>
                        <p className='col-span-1'>TT thanh toán</p>
                    </div>
                    {
                        order_data.length <= 0 ? (
                            <div>
                                <div className='grid grid-cols-6 px-4 py-2 mt-16'>
                                    <p className='col-span-6'>không có đơn hàng nào</p>
                                </div>
                            </div>
                        ) : 
                        order_data.map((order) => (
                            <div className='border-b border-black pb-3 mt-4' key={order.id}>

                                {order.items.map((item, id) => (
                                    <div key={id} className='grid grid-cols-6 px-4 py-2 mt-16'>
                                        <div className='col-span-2 flex items-center'>
                                            <img className='w-80px h-[90px]' src={item.url} alt="book_cover" />
                                            <div className='flex flex-col gap-2'>
                                                <p>{item.title}</p>
                                                <p>Đơn giá: {item.price} &#8363;</p>
                                                <p>Số lượng x{item.unit}</p>
                                            </div>
                                        </div>
                                        <div className='col-span-1'>
                                            <p className='w-[60%]'>{order.days}</p>
                                        </div>
                                        <div className='col-span-1'>
                                            <p>{order.address}</p>
                                        </div>
                                        <div className='col-span-1'>
                                            <p className='ml-[5rem]'>{order.total}.000&#8363;</p>
                                        </div>
                                        <div className='col-span-1'>
                                            <p className={`${order.status === 'Chưa thanh toán' ? 'text-red-500'  : 'text-blue-500'}`}>{order.status}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex items-center justify-end gap-4 mr-5'>
                                    <button className='py-[8px] px-4 bg-red-500 hover:bg-red-600 border text-white rounded-md min-w-[120px] text-center' >Đánh giá</button>
                                    <Link  className='py-[8px] px-4 border border-gray-950 rounded-md hover:bg-slate-200 min-w-[120px] text-center' to='/collections'>Mua lại</Link>
                                </div>
                            </div>  
                        ))

                    }

                </div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
