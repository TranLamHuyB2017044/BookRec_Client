import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { Exit } from '../../store/userReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { PublicRequest } from '../../service/Request.js';
import { LogoutCart } from '../../store/cartReducer.js';
import Alert from '../../Components/AlertComponent/Alert.js';

export default function YourOrder() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const [myOrders, setMyOrders] = useState([])


    useEffect(() => {
        document.title = 'BookRec - Your Orders';
    }, [])

    useEffect(() => {
        const getOrders = async () => {
            const user_id = user.user_id
            const response = await PublicRequest.get(`/order/${user_id}`)
            setMyOrders(response.data)
        }
        getOrders()
    }, [user])



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
        dispatch(LogoutCart())
        window.localStorage.removeItem('persist:root')
    }

    const sortOrders = myOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

    const getPaymentStatusClass = (status) => {
        switch (status) {
            case 'Đã tạo đơn hàng':
                return 'text-gray-500';
            case 'Đang chuẩn bị hàng':
                return 'text-orange-500';
            case 'Đơn hàng đang được giao':
                return 'text-yellow-500';
            case 'Đã thanh toán':
                return 'text-[dodgerblue]';
            case 'Đã giao':
                return 'text-green-500';
            case 'Đã hủy':
                return 'text-red-500';
            default:
                return 'text-black';
        }
    };


    const handleCancelOrder = async (orderId) => {
        console.log(orderId)
        Alert.Confirm('Hủy đơn hàng', 'question', 'Xác nhận hủy đơn hàng này', 'Có', 'Không')
            .then(async (result) => {
                if (result.value) {
                    const cancelOrder = await PublicRequest.put(`/order/cancel/${orderId}`)
                    if (cancelOrder.status === 200) {

                        Alert.Alert('success', 'Hủy đơn hàng thành công!')
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        Alert.Alert('error', 'Có lỗi khi thực hiện, thử lại sau vài giây')

                    }
                }
            })
            .catch((error) => {
                Alert.Alert('error', error.message)
            });

    }

    return (
        <div className='bg-[#f5f5f5]' >
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <div className=' lg:w-[1400px]  mx-auto my-8 flex md:flex-row s:flex-col s:w-full gap-32 ' >
                <div className="mt-[5rem] flex flex-col items-start">
                    <div className="flex items-center gap-1 text-4xl">
                        <h1>Xin chào, </h1>
                        <h1 className="text-[#f47830]">{user.fullname}!</h1>
                    </div>
                    <ul className="mt-16 flex md:flex-col sm:flex-row sm:gap-10 sm:overflow-x-auto gap-5">
                        <Link to="/account" className="hover:text-[#f47830] cursor-pointer">Thông tin tài khoản</Link>
                        <Link to="/yourOrders" className="hover:text-[#f47830] cursor-pointer text-[#f47830]">Đơn hàng của bạn</Link>
                        <Link to="/verifyAccount" className="hover:text-[#f47830] cursor-pointer">Xác thực email</Link>
                        <Link to="/contact" className="hover:text-[#f47830] cursor-pointer">Trung tâm hỗ trợ</Link>
                        <Link onClick={Logout} className="hover:text-[#f47830] cursor-pointer">Đăng xuất</Link>
                    </ul>
                </div>

                <div className='mt-[5rem] basis-3/4 px-8'>
                    <h1 className='text-4xl'>Đơn hàng của bạn</h1>
                    <div className='grid grid-cols-6 bg-[#f47830] text-white px-4 py-2 mt-16'>
                        <p className='col-span-5'>Đơn hàng</p>
                        <p className='col-span-1'>Đơn giá</p>
                    </div>
                    {
                        myOrders.length <= 0 ? (
                            <div >
                                <div className='grid grid-cols-6 px-4 py-2 mt-16 '>
                                    <p className='col-span-6'>không có đơn hàng nào</p>
                                </div>
                            </div>
                        ) :
                            sortOrders.map((order) => (
                                <div key={order.order_id} className='border  py-3 px-8 mt-4 bg-white rounded-lg '>
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
                                            <p className=''>{order.order_date.substring(0, order.order_date.indexOf('T'))}</p>
                                        </div>
                                        <div className='col-span-1'>
                                            <p className={getPaymentStatusClass(order.payment_status)}>{order.payment_status}</p>

                                        </div>
                                    </div>
                                    {order.items.map((item, id) => (
                                        <div key={id} className='grid grid-cols-6 px-4 py-4 mt-4  bg-white'>
                                            <div className='col-span-5 flex items-center gap-4'>
                                                <img className='border-gray-500 border h-[90px]' src={item.thumbnail_url} alt="book_cover" />
                                                <div className='flex flex-col gap-4'>
                                                    <p className='max-w-[350px]'>{item.title}</p>
                                                    <p>Số lượng x{item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className='col-span-1'>
                                                <p className='mt-8'>{(item.original_price).toLocaleString()}&#8363;</p>
                                                <p className='mt-8'>{item.promotion_percent ? `- ${item.promotion_percent}%` : ''}</p>
                                                <p className='mt-8'>{item.promotion_percent ? ` - ${((item.original_price * item.promotion_percent) / 100).toLocaleString()}` : ''}</p>

                                            </div>

                                        </div>
                                    ))}
                                    <div className='flex gap-2 justify-end mt-2 mr-32 pr-8'>
                                        <p className=' text-gray-500'>{order.shipping_method}:</p>
                                        {order.shipping_method === 'Giao hàng tận nơi' ? <p>28,000&#8363;</p> : <p>15,000&#8363;</p>}
                                    </div>
                                    <div className='flex flex-col items-end justify-end mt-4'>
                                        <div className='flex gap-2  mr-32 mb-4 pr-8'>
                                            <p className='text-3xl text-gray-500'>Tổng tiền: </p>
                                            <p>{(order.total_price).toLocaleString()}&#8363;</p>
                                        </div>
                                        <div className='flex mb-2 gap-4 mr-8'>
                                            {order.payment_status === 'Đã tạo đơn hàng' && <button onClick={() => handleCancelOrder(order.order_id)} className='py-[8px] px-4 border border-gray-950 rounded-md hover:bg-[#f37070] min-w-[120px] bg-[red] text-white text-center'>Hủy đơn hàng</button>}
                                            <Link className='py-[8px] px-4 border border-gray-950 rounded-md hover:bg-slate-200 min-w-[120px] text-center' to='/collections'>Mua lại</Link>
                                        </div>
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
