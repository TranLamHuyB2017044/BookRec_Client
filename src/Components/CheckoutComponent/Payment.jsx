import React from 'react'

export default function Payment() {
  return (
    <div className='bg-white h-full border rounded-md'>
      <div className='mx-4 py-8'>
        <h1 className='text-4xl mb-4'>Vận chuyển</h1>
        <div className='flex items-center justify-between border p-4 rounded-lg mb-5'>
          <div className='flex items-center gap-3'>
            <input className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
            <p>Giao hàng tận nơi</p>
          </div>
          <p>28.000 &#8363;</p>
        </div>
      </div>
      <div className=' mx-4 '>
        <h1 className='text-4xl mb-4'>Thanh toán</h1>
        <div className='border rounded-lg'>
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
              <input className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
              <p>Thanh toán qua Zalo pay</p>
            </div>
            <img width='40px' height='40px' src="https://cdn.tgdd.vn/2020/04/GameApp/image-180x180.png" alt="zalopay" />
          </div>
          <div className='flex items-center justify-between p-4 border-t mb-2'>
            <div className='flex items-center gap-3'>
              <input className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
              <p>Thanh toán khi nhận hàng</p>
            </div>
            <img width='40px' height='40px' src="https://cdn-icons-png.flaticon.com/512/5578/5578525.png" alt="cashdelivery" />
          </div>
        </div>
      </div>
    </div>
  )
}
