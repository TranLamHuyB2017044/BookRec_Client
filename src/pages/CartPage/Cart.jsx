/* eslint-disable jsx-a11y/aria-role */
import React, { useCallback, useEffect, useMemo } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
// import { books_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import { PublicRequest } from '../../service/Request.js'
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeBook } from '../../store/cartReducer.js'
import MyAlert from '../../Components/AlertComponent/Alert.js'
export default function Cart() {
    const cartItem = useSelector(state => state.cart.books)

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
    const dispatch = useDispatch()
    const handleChangeQuantity = (index, type) => {
        cartItem.map(async (item, i) => {
            try {
                if (type === 'incr') {
                    if (i === index) {
                        dispatch(incrementQuantity(i))
                        await PublicRequest.put('cart/', { item_id: item.item_id, quantity: item.quantity + 1 })
                    }
                } else {
                    if (i === index) {
                        dispatch(decrementQuantity(i))
                        if (item.quantity > 1) {
                            await PublicRequest.put('cart/', { item_id: item.item_id, quantity: item.quantity - 1 })
                        }
                    }
                }

            } catch (error) {
                console.log(error.data.response)
            }
        })
    }
    useEffect(() => {
        document.title = 'BookRec - Cart'
    }, [])

    const discountPrice = useCallback((book) => {
        let price = 0

        if (book.promotion_percent != null) {
            const discount = ((book.original_price * book.promotion_percent) / 100)
            price = book.original_price - discount
        }
        return price
    })
    console.log(cartItem)
    const TotalPrice = useCallback(items => {
        let total = 0;
        // eslint-disable-next-line array-callback-return

        items.map(item => {
            if (item.promotion_percent != null) {
                
                total += item.quantity * discountPrice(item)
            }
        })
        return total
    }, [])


    const handleDeleteCartItems = (index) => {
        try {
            cartItem.map((item, i) => {
                if (index === i) {
                    MyAlert.Confirm('Xóa sản phẩm', 'warning', `Bạn có muốn xóa sản phẩm đang chọn?`, 'Xác nhận')
                        .then(async (result) => {
                            if (result.value) {
                                await PublicRequest.delete('cart/', { data: { item_id: item.item_id } })
                                dispatch(removeBook(index))
                            }
                        })
                }
                return cartItem
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <h1 className='mt-36 px-5 text-5xl md:ml-72'>Giỏ hàng của bạn</h1>
            {cartItem?.length > 0 ? (
                <div className='h-full lg:w-[1200px] s:w-full md:w-[750px] mx-auto mt-12 mb-5 md:flex-row flex rounded-lg gap-4 s:flex-col'>
                    <div className='border basis-3/4 pt-3'>
                        <div className='grid grid-cols-7 px-3 py-2 '>
                            <p className='lg:col-span-4 md:col-span-3 s:col-span-7'>Thông tin sản phẩm</p>
                            <p className='lg:col-span-1 s:hidden lg:block'>Đơn giá</p>
                            <p className='lg:col-span-1 md:col-span-2 s:hidden lg:block'>Số lượng</p>
                            <p className='lg:col-span-1 md:col-span-2 s:hidden lg:block'>Thành tiền</p>
                        </div>
                        <div>
                            {cartItem.map((book, index) => (
                                <div key={index} className='px-3 mt-2 mx-auto py-5 grid grid-cols-7 border-t w-[95%] relative'>
                                    <div className='lg:flex-row flex s:flex-col s:items-start s:col-span-4 lg:col-span-4 md:col-span-3 items-center gap-4'>
                                        <img className='lg:w-[150px] s:w-[80px] s:h-[80px] md:mb-2 md:w-[100px] lg:h-[150px] md:h-[100px]' src={book.thumbnail_url} alt="img" />
                                        <p>{book.title}</p>
                                    </div>
                                    <p className='col-span-1 m-auto s:hidden lg:block'>{book.promotion_percent !== null ? (discountPrice(book))?.toLocaleString(): (book.quantity * book.original_price)?.toLocaleString()}&#8363;</p>
                                    <div className='lg:col-span-1 s:col-span-2 flex items-center m-auto gap-2'>
                                        <button onClick={() => handleChangeQuantity(index, 'decr')} className='border px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f47830] hover:text-white'>-</button>
                                        <p className='border px-6 py-2 '>{book.quantity}</p>
                                        <button onClick={() => handleChangeQuantity(index, 'incr')} className='border px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f47830] hover:text-white'>+</button>
                                    </div>
                                    <p className='lg:col-span-1 s:mt-5 md:m-auto s:col-span-2'>{book.promotion_percent !== null ? (book.quantity * (discountPrice(book)))?.toLocaleString() : (book.quantity * book.original_price)?.toLocaleString()}&#8363;</p>
                                    <button onClick={() => handleDeleteCartItems(index)} className='absolute right-5 top-3 text-5xl cursor-pointer opacity-85'>
                                        &times;
                                    </button>
                                </div>

                            )).reverse()}
                        </div>
                    </div>
                    <div className='border basis-1/4 h-fit py-5 lg:px-4 s:px-4 flex flex-col gap-12 md:px-1'>
                        <div className='flex items-center justify-between '>
                            <h1>Tạm tính</h1>
                            <p className=''>{TotalPrice(cartItem)?.toLocaleString()} &#8363;</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <h1>Tổng tiền</h1>
                            <p className='lg:text-4xl md:text-2xl text-[#ff424e]'>{TotalPrice(cartItem)?.toLocaleString()} &#8363;</p>
                        </div>
                        <Link to='/checkout' className='lg:py-3 s:py-3 s:text-center md:py-2 lg:px-32 s:w-[80%] lg:w-fit mt-4 ml-8 rounded-xl bg-[#ff424e] text-white hover:bg-[#c56f75]'>Mua hàng</Link>
                    </div>
                </div>
            ) : (
                <div className='mx-auto flex flex-col items-center gap-[1.2rem] md:w-[700px] border w-[1200px] my-16 py-8 bg-white'>
                    <img
                        width="120px"
                        src="https://png.pngtree.com/png-clipart/20221223/ourmid/pngtree-shoping-clipart-image-download-vector-art-png-image_6534634.png"
                        alt="src"
                    />
                    <p className='text-[2rem] text-[#888383]'>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                    <Link to="/collections">
                        <button className='py-[10px] px-8 rounded-xl text-white text-[1.6rem] my-4 border bg-[#f47830] hover:bg-[#cb9779]'>Mua ngay</button>
                    </Link>
                </div>
            )}
            <GoToTop />
            <Footer />
        </div>
    )
}
