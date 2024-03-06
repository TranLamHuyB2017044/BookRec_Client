import React, { useState } from 'react'

export default function Payment() {
  const [Shipping, setShipping] = useState("");
  const [Payment, setPayment] = useState("");
  const [checked, setChecked] = useState(false);
  const shippingMethods = [
    {
      id: 1,
      Method: 'Giao hàng tận nơi',
      price: 28000
    },
    {
      id: 2,
      Method: 'Giao đến bưu điện gần nhất',
      price: 15000
    }
  ]

  const handleChangeShippingMethods = (id) => {
    shippingMethods.map((item) => {
      if (item.id === id) {
        setShipping(item.Method)
      }
    })
  }
  const PaymentMethods = [
    {
      id: 1,
      Method: 'Thanh toán khi nhận hàng',
    },
    {
      id: 2,
      Method: 'Thanh toán qua ZaloPay',
    }
  ]

  const handleChangePaymentMethods = (id) => {
    PaymentMethods.map((item) => {
      if (item.id === id) {
        setPayment(item.Method)
      }
    })
  }
  return (
    <div className='bg-white h-full border rounded-md'>
      <div className='mx-4 py-8'>
        <h1 className='text-4xl mb-4'>Vận chuyển</h1>
        {shippingMethods.map((method) => (
          <div key={method.id} className='flex items-center justify-between border p-4 rounded-lg mb-2'>
            <div className='flex items-center gap-3'>
              <input checked={checked === method.id}
                onChange={() => setChecked(method.id)} onClick={() => handleChangeShippingMethods(method.id)} className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
              <p>{method.Method}</p>
            </div>
            <p>{(method.price).toLocaleString()} &#8363;</p>
          </div>
        ))}

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
