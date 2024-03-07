import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Order({price_shipping, onSubmit, TotalPrice, OrderItem}) {
  

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
            <p>{(price_shipping).toLocaleString()}&#8363;</p>
          </div>
      </div>
      <div className='border-t px-4 pt-16 mt-4 flex flex-col gap-5 w-[90%] mx-auto'>
          <div className='flex justify-between items-center text-3xl'>
            <p>Tổng cộng</p>
            <p className='text-blue-400'>{(TotalPrice(OrderItem.books)+price_shipping).toLocaleString()}&#8363;</p>
          </div>
          <div className='flex justify-between items-center text-3xl py-4'>
           <div className='cursor-pointer group flex items-center text-blue-500 hover:text-blue-700'>
              <p className='transition-transform transform group-hover:-translate-x-2  text-4xl mt-1'>{'<'}</p> 
              <Link to='/cart' className='text-2xl '>Quay về giỏ hàng</Link>
           </div>
            <button type='submit' onClick={onSubmit} className='py-4 px-12 bg-blue-400 rounded-2xl text-white hover:bg-blue-500'>Đặt hàng</button>
          </div>
      </div>
    </div>
  )
}
