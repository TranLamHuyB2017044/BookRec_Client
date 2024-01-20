/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import { books_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';

import { Link } from 'react-router-dom';
import  Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
export default function Cart() {

    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/cart',
            label: 'Giỏ hàng'
        }

    ]

    const book_empty = []

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs}/>
            <h1 className='mt-36 px-5 text-5xl ml-72'>Giỏ hàng của bạn</h1>
            {books_data.length > 0 ? (
                <div className='h-screen w-[1200px]  mx-auto mt-12 mb-5 flex rounded-lg gap-4'>
                    <div className='border basis-3/4 pt-3'>
                        <div className='grid grid-cols-7 px-3 py-2'>
                            <p className='col-span-4'>Thông tin sản phẩm</p>
                            <p className='col-span-1'>Đơn giá</p>
                            <p className='col-span-1'>Số lượng</p>
                            <p className='col-span-1'>Thành tiền</p>
                        </div>
                        <div>
                            {books_data.map((book, index) => (
                                <div key={index} className='px-3 mt-2 mx-auto py-5 grid grid-cols-7 border-t w-[95%] relative'>
                                    <div className='flex col-span-4 items-center gap-4'>
                                        <img className='w-[150px] h-[150px]' src={book.url} alt="img" />
                                        <p>{book.title}</p>
                                    </div>
                                    <p className='col-span-1 m-auto'>{book.price}&#8363;</p>
                                    <div className='col-span-1 flex items-center m-auto gap-2'>
                                        <p className='border px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f47830] hover:text-white'>-</p>
                                        <p className='border px-6 py-2 '>1</p>
                                        <p className='border px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f47830] hover:text-white'>+</p>
                                    </div>
                                    <p className='col-span-1 m-auto'>{book.price}&#8363;</p>
                                    <p className='absolute right-5 top-3 text-5xl cursor-pointer opacity-85'>
                                        &times;
                                    </p>
                                </div>

                            )).slice(-3)}
                        </div>
                    </div>
                    <div className='border basis-1/4 h-fit py-5 px-4 flex flex-col gap-12'>
                        <div className='flex items-center justify-between'>
                            <h1>Tạm tính</h1>
                            <p>450 &#8363;</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <h1>Tổng tiền</h1>
                            <p className='text-4xl text-[#ff424e]'>450 &#8363;</p>
                        </div>
                        <button className='py-3 px-32 mt-4 ml-8 rounded-xl bg-[#ff424e] text-white hover:bg-[#c56f75]'>Mua hàng</button>        
                    </div>
                </div>  
            ): (
                <div className='mx-auto flex flex-col items-center gap-[1.2rem] border w-[1200px] my-16 py-8 bg-white'>
                  <img
                    width="120px"
                    src="https://png.pngtree.com/png-clipart/20221223/ourmid/pngtree-shoping-clipart-image-download-vector-art-png-image_6534634.png"
                    alt="src"
                  />
                  <p className='text-[2rem] text-[#888383]'>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                  <Link to="/collections">
                    <button className='py-[10px] px-8 rounded-xl text-[1.6rem] my-4 border bg-[#f47830] hover:bg-[#cb9779]'>Mua ngay</button>
                  </Link>
                </div>
            )}
            <GoToTop />
            <Footer />
        </div>
    )
}
