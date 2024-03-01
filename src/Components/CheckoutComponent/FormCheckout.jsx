import React from 'react'

export default function FormCheckout({register, errors}) {
    
  return (
    <div className='bg-white border rounded-md'>
        <h2 className='p-4 text-4xl'>Thông tin mua hàng</h2>
        <div className='p-8 flex flex-col  '>
            <div className='flex flex-col'>
                <label htmlFor="fullname " className='text-[#616161] font-bold'>Họ và tên</label>
                <input className={`pl-4 w-[390px] h-[42px] border outline-[#ccc] my-3 rounded-lg focus:outline-none ${errors.fullname ? 'border-[#ff0000]' : 'border-[#ccc]'}`} type='fullname' id="fullname" {...register("fullname", { require: true })} />
                <p className='text-red-600'>{errors.fullname?.message}</p>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="phone " className='text-[#616161] font-bold'>Số điện thoại</label>
                <input className={`pl-4 w-[390px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.phone ? 'border-[#ff0000]' : 'border-[#ccc]'}`} type='phone' id="phone" {...register("phone", { require: true })} />
                <p className='text-red-600'>{errors.phone?.message}</p>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="address" className='text-[#616161] font-bold'>Địa chỉ</label>
                <input className={`pl-4 w-[390px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.address ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="address" {...register("address", { require: true })} type="text" />
                <p className='text-red-600'>{errors.address?.message}</p>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="city" className='text-[#616161] font-bold'>Tỉnh thành</label>
                <input className={`pl-4 w-[390px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.city ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="city" {...register("city", { require: true })} type="text" />
                <p className='text-red-600'>{errors.city?.message}</p>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="district" className='text-[#616161] font-bold'>Quận huyện</label>
                <input className={`pl-4 w-[390px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.district ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="district" {...register("district", { require: true })} type="text" />
                <p className='text-red-600'>{errors.district?.message}</p>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="wards" className='text-[#616161] font-bold'>Phường xã</label>
                <input className={`pl-4 w-[390px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.wards ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="wards" {...register("wards", { require: true })} type="text" />
                <p className='text-red-600'>{errors.wards?.message}</p>
            </div>
            <div className='flex flex-col gap-3 mt-4'>
                <label htmlFor="area" className='text-[#616161] font-bold'>Ghi chú</label>
                <textarea className='pl-2 pt-2 border rounded-lg' id="area" name="area"></textarea>
            </div>
        </div>
    </div>
  )
}
