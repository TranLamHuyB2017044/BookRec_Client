import React from 'react'
import { books_data } from '../../data.jsx'
import { Link } from 'react-router-dom'

export default function Order() {
  return (
    <div>
      <h1 className='p-4 text-3xl my-2'>Đơn hàng (2 sản phẩm)</h1>
      <div className='border-t'>
        {books_data.map((book, id) => (
          <div key={id} className='flex justify-between items-center p-3'>
            <div className='flex items-center '>
              <img className='w-[90px] h-[100px]' src={book.url} alt="img" />
              <div>
                <p className='max-w-[160px]'>{book.title}</p>
                <p className='text-xl'>Khuyến mãi: {book.discount}%, -15.000&#8363; </p>
              </div>
            </div>
            <p className='opacity-75 px-2'>{book.price}.000&#8363;</p>
          </div>
        )).slice(-2)}
      </div>
      <div className='border-t px-4 pt-16 mt-4 flex flex-col gap-4 w-[90%] mx-auto'>
          <div className='flex justify-between items-center'>
            <p>Tạm tính</p>
            <p>591.300&#8363;</p>
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
