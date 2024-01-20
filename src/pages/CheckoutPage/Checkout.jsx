/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import { books_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';

import { Link } from 'react-router-dom';
import  Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
export default function Checkout() {

    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/cart',
            label: 'Giỏ hàng'
        },
        {
            link: '/checkout',
            label: 'Thanh toán'
        }

    ]

    // const book_empty = []

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs}/>
            <div className='h-screen grid grid-cols-3 mt-5 w-[1300px] mx-auto'>
                <div className='col-span-1 border'>

                </div>
                <div className='col-span-1 border'>
                    <div className='mx-4 mt-4'>
                        <h1 className='text-4xl mb-4'>Vận chuyển</h1>
                        <div className='flex items-center justify-between border p-4 rounded-lg mb-5'>
                            <div className='flex items-center gap-3'>
                                <input className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
                                <p>Thanh toán qua Zalo pay</p>
                            </div>
                            <p>28.000 &#8363;</p>
                        </div>
                    </div>
                    <div className=' mx-4 '>
                        <h1 className='text-4xl mb-4'>Thanh toán</h1>
                        <div className='border rounded-lg'>
                            <div className='flex items-center justify-between p-4 mb-3 '>
                                <div className='flex items-center gap-3'>
                                    <input className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
                                    <p>Thanh toán qua Zalo pay</p>
                                </div>
                                <img width='40px' height='40px' src="https://cdn.tgdd.vn/2020/04/GameApp/image-180x180.png" alt="zalopay" />
                            </div>
                            <div className='flex items-center justify-between p-4 border-t'>
                                <div className='flex items-center gap-3'>
                                    <input className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
                                    <p>Thanh toán khi nhận hàng</p>
                                </div>
                                <img width='40px' height='40px' src="https://cdn-icons-png.flaticon.com/512/5578/5578525.png" alt="cashdelivery" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 border'></div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
