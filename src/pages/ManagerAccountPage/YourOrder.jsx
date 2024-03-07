/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import { order_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { Exit } from '../../store/userReducer.js';
import { useDispatch } from 'react-redux';
export default function YourOrder() {
    const dispatch = useDispatch()
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

    const Logout = () => {
        window.location.href = 'http://localhost:5000/auth/logout';
        dispatch(Exit())
        window.localStorage.removeItem('persist:root')
    }
    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <div className='h-full w-[1400px] mx-auto my-8 flex gap-32'>
                <div className='mt-[5rem] basis-1/4'>
                    <div className='flex items-center gap-1 text-4xl'>
                        <h1 className=''>Xin chào, </h1>
                        <h1 className='text-[#f47830]'>Trần Lâm Huy !</h1>
                    </div>
                    <ul className='mt-16 flex flex-col gap-5 '>
                        <Link to='/account' className='hover:text-[#f47830] cursor-pointer'>Thông tin tài khoản</Link>
                        <Link to='/yourOrders' className='hover:text-[#f47830] cursor-pointer text-[#f47830]'>Đơn hàng của bạn</Link>
                        <Link to='/changepassword' className='hover:text-[#f47830] cursor-pointer'>Đổi mật khẩu</Link>
                        <Link onClick={Logout} className='hover:text-[#f47830] cursor-pointer'>Đăng xuất</Link>
                    </ul>
                </div>
                <div className='mt-[5rem] basis-3/4 px-8'>
                    <h1 className='text-4xl'>Đơn hàng của bạn</h1>
                    <div className='grid grid-cols-6 bg-[#f47830] text-white px-4 py-2 mt-16'>
                        <p className='col-span-5'>Đơn hàng</p>
                        <p className='col-span-1'>Đơn giá</p>
                    </div>
                    {
                        order_data.length <= 0 ? (
                            <div>
                                <div className='grid grid-cols-6 px-4 py-2 mt-16 '>
                                    <p className='col-span-6'>không có đơn hàng nào</p>
                                </div>
                            </div>
                        ) :
                            order_data.map((order) => (
                                <div className='border  py-3 px-8 mt-4 bg-white rounded-lg ' key={order.id}>
                                    <div className='grid grid-cols-6 px-4'>
                                        <div className='col-span-3'>
                                            <p className='text-gray-500'>Địa chỉ</p>
                                        </div>
                                        <div className='col-span-2'>
                                            <p className='text-gray-500'>Ngày Đặt</p>
                                        </div>
                                        <div className='col-span-1'>
                                            <p className='text-gray-500'>Trạng thái</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-6 px-4 py-4  border-b '>
                                        <div className='col-span-3'>
                                            <p className=''>{order.address}</p>
                                        </div>
                                        <div className='col-span-2'>
                                            <p className=''>{order.days}</p>
                                        </div>
                                        <div className='col-span-1'>
                                            <p className={order.status === 'Đã thanh toán' ? 'text-[dodgerblue]' : 'text-red-500'}>{order.status}</p>
                                        </div>
                                    </div>
                                    {order.items.map((item, id) => (
                                        <div key={id} className='grid grid-cols-6 px-4 py-4 mt-4  bg-white'>
                                            <div className='col-span-5 flex items-center gap-4'>
                                                <img className='border-gray-500 border h-[90px]' src={item.url} alt="book_cover" />
                                                <div className='flex flex-col gap-4'>
                                                    <p>{item.title}</p>
                                                    <p>Số lượng x{item.unit}</p>
                                                </div>
                                            </div>
                                            <div className='col-span-1'>
                                                <p className='mt-8'>{item.price}.000&#8363;</p>
                                            </div>

                                        </div>
                                    ))}
                                    <div className='flex item-center gap-2 justify-end  pr-32 mb-4'>
                                        <p className='text-3xl text-gray-500'>Tổng tiền: </p>
                                        <p>20000 vnd</p>
                                    </div>
                                    <div className='flex items-center justify-end mb-2 gap-4 mr-5'>
                                        <button className='py-[8px] px-4 bg-red-500 hover:bg-red-600 border text-white rounded-md min-w-[120px] text-center' >Đánh giá</button>
                                        <Link className='py-[8px] px-4 border border-gray-950 rounded-md hover:bg-slate-200 min-w-[120px] text-center' to='/collections'>Mua lại</Link>
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
