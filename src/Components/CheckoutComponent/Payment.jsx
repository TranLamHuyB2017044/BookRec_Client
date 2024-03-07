import React, { useState } from 'react'

export default function Payment({ setShippingPrice, setShipping, setPayment }) {
  const [checkedShipping, setCheckedShipping] = useState();
  const [checkedPayment, setCheckedPayment] = useState();

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
        setShippingPrice(item.price)
      }
      return item
    })
  }

  const PaymentMethods = [
    {
      id: 1,
      Method: 'Thanh toán khi nhận hàng',
      logo: "https://cdn-icons-png.flaticon.com/512/5578/5578525.png"
    },
    {
      id: 2,
      Method: 'Thanh toán qua ZaloPay',
      logo: 'https://cdn.tgdd.vn/2020/04/GameApp/image-180x180.png'
    }
  ]

  const handleChangePaymentMethods = (id) => {
    PaymentMethods.map((item) => {
      if (item.id === id) {
        setPayment(item.Method)
      }
      return item
    })
  }


  return (
    <div className='bg-white h-full border rounded-md'>
      <div className='mx-4 py-8'>
        <h1 className='text-4xl mb-4'>Vận chuyển</h1>
        {shippingMethods.map((method) => (
          <div key={method.id} className='flex items-center justify-between border p-4 rounded-lg mb-2'>
            <div className='flex items-center gap-3'>
              <input checked={checkedShipping === method.id}
                onChange={() => setCheckedShipping(method.id)} onClick={() => handleChangeShippingMethods(method.id)} className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
              <p>{method.Method}</p>
            </div>
            <p>{(method.price).toLocaleString()} &#8363;</p>
          </div>
        ))}

      </div>
      <div className=' mx-4 '>
        <h1 className='text-4xl mb-4'>Thanh toán</h1>
        <div className='flex flex-col gap-2'>
          {PaymentMethods.map((payment => (
            <div key={payment.id} className='flex items-center justify-between p-4 border rounded-lg'>
              <div className='flex items-center gap-3'>
                <input checked={checkedPayment === payment.id} onChange={() => setCheckedPayment(payment.id)} onClick={() => handleChangePaymentMethods(payment.id)} className=' cursor-pointer w-8 h-8' type="radio" name="" id="" />
                <p>{payment.Method}</p>
              </div>
              <img width='40px' height='40px' src={payment.logo} alt="payment_image" />
            </div>
          )))}
          
        </div>
      </div>
    </div>
  )
}
