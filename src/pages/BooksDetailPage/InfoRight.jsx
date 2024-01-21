import React from 'react'

export default function InfoRight({ books, Star }) {
    return (
        <div className='w-full mx-auto'>
            <div className='  *:flex  flex-col mt-5 gap-4 bg-[#ffff] p-10 rounded-xl border'>
                <h2 className='text-6xl mb-8'>
                    Lý thuyết trò chơi
                </h2>
                <p className='opacity-85 my-3'>Tác giả: Trần Phách Hàm</p>
                <p className='flex items-center'>{Star(5, 'yellow')} (Đánh giá 5 sao)</p>
                <div className='my-10 gap-2 flex flex-col text-3xl'>
                    <div className='flex gap-4 py-4'>
                        <p>Loại sách: </p>
                        <p className=' opacity-70'>Sách tư duy - Kỹ năng sống</p>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex gap-4'>
                            <p>Số lượng còn lại: </p>
                            <p className=''>(1205)</p>
                        </div>
                        <div className='flex gap-4'>
                            <p>Đã bán:</p>
                            <p>(300)</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-8 items-center'>
                    <span className='text-red-500 text-5xl mt-5'>255.000&#8363;</span>
                    <div className='flex items-center mt-5 gap-3'>
                        <p>Giá cũ: </p>
                        <del>269.000&#8363;</del>
                    </div>
                </div>
                <div className='flex items-center gap-6 my-10'>
                    <p>Số lượng:</p>
                    <div className='flex items-center gap-2  text-4xl '>
                        <p className='border border-[#a4a3a3] hover:bg-[#f47830] py-3 px-3 cursor-pointer rounded-lg'>-</p>
                        <p className='border border-[#a4a3a3] py-3 px-8 rounded-lg'>1</p>
                        <p className='border border-[#a4a3a3] hover:bg-[#f47830] py-3 px-3 cursor-pointer rounded-lg'>+</p>
                    </div>
                </div>
                <div className='flex gap-8 my-10'>
                    <button className='py-4 border w-[200px] text-white bg-red-400 rounded-lg hover:opacity-80'>Mua ngay</button>
                    <button className='py-4 border w-[200px] text-[#4e84e7] border-[#4e84e7] rounded-lg hover:opacity-80'>Thêm vào giỏ hàng</button>
                </div>
            </div>
            <section className='mx-auto mt-4  h-[370px] border rounded-xl p-10 bg-[#ffff]'>
                <h1 className='font-bold text-3xl mb-10'>Mô tả sản phẩm</h1>
                <p className='text-justify'>
                    Cuốn sách giới thiệu các mô hình hồi quy tuyến tính, hồi quy logistic, hồi quy Poisson, và hồi quy Cox. Bạn đọc sẽ học qua các phát biểu giả thuyết khoa học qua các mô hình hồi quy. Những vấn đề (ít khi nào được đề cập trong sách giáo khoa) như đánh giá tầm quan trọng của biến tiên lượng, hoán chuyển dữ liệu, xây dựng và kiêm định mô hình, LASSO, Ridge, Robust, và cách triển khai các ý tưởng này bằng ngôn ngữ R.
                </p>
                <br />
                <p className='text-justify'>
                    Cuốn sách giới thiệu các mô hình hồi quy tuyến tính, hồi quy logistic, hồi quy Poisson, và hồi quy Cox. Bạn đọc sẽ học qua các phát biểu giả thuyết khoa học qua các mô hình hồi quy. Những vấn đề (ít khi nào được đề cập trong sách giáo khoa) như đánh giá tầm quan trọng của biến tiên lượng, hoán chuyển dữ liệu, xây dựng và kiêm định mô hình, LASSO, Ridge, Robust, và cách triển khai các ý tưởng này bằng ngôn ngữ R.
                </p>
            </section>
        </div>
    )
}

