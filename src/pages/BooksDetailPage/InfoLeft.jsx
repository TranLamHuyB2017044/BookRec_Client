
import React from 'react'

export default function InfoLeft({ books }) {
    return (
        <div>
            <div className='w-[550px] h-fit mt-5 mb-4 bg-[#fff] p-4 rounded-xl border'>
                <div className='border-[3px] border-[#f47830]  rounded-lg mx-auto'>
                    <img className='p-5 h-[450px] w-[350px] mx-auto cursor-pointer' src="https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/42/16/35/086695a87906c6dab22ff7e8147237a8.jpg" alt="cover-img" />
                </div>
                <div className='flex justify-between my-4 mx-auto'>
                    {books.map((book, index) => (
                        <div key={index} className='border border-[#f47830] rounded-sm p-1 gap-2 cursor-pointer'>
                            <img className='w-[110px] ' src={book.url} alt="more-img" />
                        </div>
                    )).slice(-4)}
                </div>
            </div>
            <section className='mx-auto mb-4  border rounded-xl p-10 bg-[#ffff]'>
                <div className='w-full flex flex-col gap-8'>
                    <h1 className='text-4xl font-bold my-3'>Thông tin chi tiết</h1>
                    <div className='flex justify-between'>
                        <p>Công ty phát hành</p>
                        <p>NXB Tổng Hợp TP. HCM</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Ngày xuất bản</p>
                        <p>2022-11-30 15:52:54</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Số trang</p>
                        <p>324</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Nhà xuất bản</p>
                        <p>Nhà Xuất Bản Tổng hợp TP.HCM</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
