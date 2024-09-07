import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PublicRequest } from '../../service/Request'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useSelector } from 'react-redux'
export default function Order({ price_shipping, onSubmit, TotalPrice, OrderItem, selectedCoupon, setSelectedCoupon, TotalOrderPrice }) {
  const user = useSelector(state => state.user.currentUser)
  const [userCoupons, setUserCoupons] = useState([])


  const discountPrice = useCallback((book) => {
    let price = 0
    if (book.promotion_percent != null) {
      const discount = ((book.original_price * book.promotion_percent) / 100)
      price = book.original_price - discount
    }
    return price
  }, [])


  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false)

  };
  const handleSaveAndCloseModal = () => {
    setOpenModal(false)

  };

  useEffect(() => {
    const getUserCoupons = async () => {
      const user_id = user.user_id;
      const response = await PublicRequest.get(`/coupon/userCoupons?user_id=${user_id}`)
      setUserCoupons(response.data)
    }
    getUserCoupons()
  }, [])





  return (
    <div className='bg-white h-full border rounded-md'>
      <h1 className='p-4 text-3xl '>Đơn hàng ({OrderItem.quantity} sản phẩm)</h1>
      <div className='border-t'>
        {OrderItem.books.map((book, id) => (
          <div key={id} className='flex justify-between items-center p-3 '>
            <div className='flex items-center gap-3'>
              <img className='w-[90px] h-[100px]' src={book.thumbnail_url} alt={`cover_book_${book.cover_id}`} />
              <div>
                <p className='max-w-[220px]'>{book.title}</p>
                <p className='text-xl'>Khuyến mãi: {book.promotion_percent !== null ? `- ${(book.promotion_percent).toLocaleString()}%` : '0%'} &#8363; </p>
                <p className='text-xl'>Số lượng: x {book.quantity}</p>
              </div>
            </div>
            <p className='opacity-75 px-2'>{book.promotion_percent !== null ? (discountPrice(book)).toLocaleString() : (book.original_price).toLocaleString()}&#8363;</p>
          </div>
        ))}
      </div>
      <div className='border-t px-4 pt-16 mt-4 flex flex-col gap-4 w-[90%] mx-auto'>
        <div className='flex justify-between items-center'>
          <p>Tạm tính</p>
          <p>{TotalPrice(OrderItem.books).toLocaleString()}&#8363;</p>
        </div>
        <div className='flex justify-between items-center'>
          <p>Phí vận chuyển</p>
          <p>{(price_shipping).toLocaleString()}&#8363;</p>
        </div>
      </div>
      <div className='border-t px-4 pt-4 mt-4 flex flex-col gap-5 w-[90%] mx-auto'>
        <div className='flex justify-between items-center '>
          <p className='text-2xl '>Khuyến mãi</p>
          <button type='button' onClick={handleOpenModal} className='text-blue-500 text-md'>Chọn</button>
        </div>
        {selectedCoupon != null &&
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-4'>
              <p className='text-2xl'>Đã chọn mã giảm giá <strong className='text-[dodgerblue]'>{selectedCoupon.coupon_name}</strong></p>
              <p className='text-2xl'> {selectedCoupon.coupon_type === 'Miễn phí vận chuyển' ? `${selectedCoupon.coupon_type}` : `Giảm ${selectedCoupon.coupon_percent} % Tổng hóa đơn`}</p>
              <p className='text-2xl'>Cho đơn hàng từ {selectedCoupon.applying_condition} &#8363;</p>
            </div>
            <p>{selectedCoupon.coupon_type === 'Miễn phí vận chuyển' ? `- ${price_shipping}` : `- ${Math.floor(TotalPrice(OrderItem.books) * (selectedCoupon.coupon_percent / 100)).toLocaleString()} `} &#8363;</p>
          </div>
        }
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <div className='absolute top-[50%] left-[50%] w-[500px] h-[500px] bg-white px-4 rounded-md transform -translate-x-[50%] -translate-y-[50%] flex flex-col '>
          <div className='relative flex items-center gap-2  justify-center h-[50px] border-b py-14 basis-1/6'>
            <div className='absolute left-36 ml-2 top-11 text-[dodgerblue]'>
              <SearchIcon fontSize='large' />
            </div>
            <input className='rounded-md border-[1px] border-gray-400 py-1 h-[33px] pl-12 w-[300px] outline-[dodgerblue]' type="text" placeholder='Tìm kiếm theo mã voucher' />
          </div>
          <div className='basis-4/6'>
            {userCoupons.map((coupon) => (
              <div key={coupon.coupon_id} className='flex border h-[100px] w-full my-2'>
                <div className='basis-1/4 bg-[#f47830] flex justify-center items-center text-6xl'>
                  <LocalMallOutlinedIcon fontSize='inherit' className='text-white' />
                </div>
                <div className='basis-3/4 border-l px-4 flex justify-between items-center'>
                  <div className='flex flex-col pl-4 justify-start gap-2'>
                    <p className='font-bold text-2xl mt-2'>{coupon.coupon_name}  {coupon.coupon_type === 'Miễn phí vận chuyển' && ` - ${coupon.coupon_type}`}</p>
                    <p>{`Giảm ${coupon.coupon_percent}%, cho đơn tối thiểu ${(coupon.applying_condition).toLocaleString()}`}&#8363;</p>
                    <p className='opacity-80'>{`Hết hạn ${coupon.end_date.split('T')[0]}`}</p>
                  </div>
                  <input onChange={() => setSelectedCoupon(coupon)} className='h-[20px] w-[20px]' type="radio" name="checked" id="checked" />
                </div>
              </div>
            ))}
          </div>
          <section className='flex justify-end items-center gap-4 border-t py-10 basis-1/6'>
            <button onClick={handleCloseModal} className='px-10 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md'>Hủy</button>
            <button onClick={handleSaveAndCloseModal} className='bg-[dodgerblue] hover:bg-[#80bdfa] py-2 px-10 text-white rounded-md'>Lưu</button>
          </section>
        </div>
      </Modal>
      <div className='border-t px-4 pt-16 mt-4 flex flex-col gap-5 w-[90%] mx-auto'>
        <div className='flex justify-between items-center text-3xl'>
          <p>Tổng cộng</p>
          <p className='text-blue-400'>{(TotalOrderPrice())?.toLocaleString()}&#8363;</p>
        </div>
        <div className='flex s:flex-col md:flex-row  justify-between items-center text-3xl py-4'>
          <div className='cursor-pointer group flex items-center text-blue-500 hover:text-blue-700'>
            <p className='transition-transform transform group-hover:-translate-x-2  text-4xl mt-1'>{'<'}</p>
            <Link to='/cart' className='text-2xl '>Quay về giỏ hàng</Link>
          </div>
          <button type='submit' onClick={onSubmit} className='s:mt-5 md:mt-0 py-4 px-12 bg-blue-400 rounded-2xl text-white hover:bg-blue-500'>Đặt hàng</button>
        </div>
      </div>
    </div>
  )
}
