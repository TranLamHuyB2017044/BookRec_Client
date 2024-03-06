import React, { useCallback } from 'react'
import { books_data } from '../../data.jsx'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Order() {
  const OrderItem = useSelector(state => state.cart)
  console.log(OrderItem)
  const TotalPrice = useCallback(items => {
    let total = 0;
    // eslint-disable-next-line array-callback-return
    items.map(item => {
        total += item.quantity * (item.original_price - (item.original_price * item.discount) / 100)
    })
    return total
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
                <p className='text-xl'>Khuyến mãi: {book.discount}%, -{((book.original_price * book.discount)/100).toLocaleString()}&#8363; </p>
                <p className='text-xl'>Số lượng: x {book.quantity}</p>
              </div>
            </div>
            <p className='opacity-75 px-2'>{(book.original_price - (book.original_price * book.discount) / 100).toLocaleString()}&#8363;</p>
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
            <p>28.000&#8363;</p>
          </div>
      </div>
      <div className='border-t px-4 pt-16 mt-4 flex flex-col gap-5 w-[90%] mx-auto'>
          <div className='flex justify-between items-center text-3xl'>
            <p>Tổng cộng</p>
            <p className='text-blue-400'>619.300&#8363;</p>
          </div>
          <div className='flex justify-between items-center text-3xl'>
           <div className='cursor-pointer group flex items-center text-blue-500 hover:text-blue-700'>
              <p className='transition-transform transform group-hover:-translate-x-2  text-4xl mt-1'>{'<'}</p> 
              <Link to='/cart' className='text-2xl '>Quay về giỏ hàng</Link>
           </div>
            <button className='py-4 px-12 bg-blue-400 rounded-2xl text-white hover:bg-blue-500'>Đặt hàng</button>
          </div>
      </div>
    </div>
  )
}
