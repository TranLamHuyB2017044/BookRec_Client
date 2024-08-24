import React from 'react'
export default function FormCheckout({register, errors, userInfo}) {

  return (
    <div className='bg-white border rounded-md h-full'>
        <h2 className='p-4 text-4xl'>Thông tin mua hàng</h2>
        <div className='p-8 flex flex-col  '>
            <div className='flex flex-col'>
                <label htmlFor="customer_name " className='text-[#616161] font-bold'>Họ và tên</label>
                <input className={`pl-4  h-[42px] border outline-[#ccc] my-3 rounded-lg focus:outline-none ${errors.customer_name ? 'border-[#ff0000]' : 'border-[#ccc]'}`} defaultValue={userInfo.fullname} type='customer_name' id="customer_name" {...register("customer_name", { require: true })} />
                <p className='text-red-600'>{errors.customer_name?.message}</p>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="phone " className='text-[#616161] font-bold'>Số điện thoại</label>
                <input className={`pl-4  h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.phone ? 'border-[#ff0000]' : 'border-[#ccc]'}`} defaultValue={userInfo.phone} type='phone' id="phone" {...register("phone", { require: true })} />
                <p className='text-red-600'>{errors.phone?.message}</p>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="address" className='text-[#616161] font-bold'>Địa chỉ</label>
                <input className={`pl-4  h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.address ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="address" {...register("address", { require: true })} type="text" />
                <p className='text-red-600'>{errors.address?.message}</p>
            </div>
            {/* <div className='flex flex-col gap-3 mt-4'>
                <label htmlFor="area" className='text-[#616161] font-bold'>Ghi chú</label>
                <textarea className='pl-2 pt-2 border rounded-lg' id="area" name="area"></textarea>
            </div> */}
        </div>
    </div>
  )
}
