import React from 'react'
import RecommendBook from './RecommendBook'

export default function BookRating({ books, Star }) {
    return (
        <div>
            <div className='bg-[#ffff] max-w-[1300px] mx-auto p-10 rounded-lg border mb-4'>
                <h1 className='text-3xl  font-bold'>Đánh giá sản phẩm</h1>
                <div>
                    <div>
                        <p className='my-4 text-3xl'>Tổng quan</p>
                        <div className='my-3'>
                            <p className='text-4xl mb-2'>4.8 {Star(5, 'yellow')}</p>
                            <p>(79 đánh giá)</p>
                        </div>
                        <div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(5, 'yellow')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[80%]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>68</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(4, 'yellow')}{Star(1, 'gray')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[8%]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>8</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(3, 'yellow')}{Star(2, 'gray')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[2%]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>2</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(2, 'yellow')}{Star(3, 'gray')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[0]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>0</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(1, 'yellow')}{Star(4, 'gray')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[1%]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>1</p>
                            </div>
                        </div>
                    </div>
                    <div className='my-5 border-t'>
                        <h1 className='my-4 text-3xl'>Tất cả hình ảnh (19)</h1>
                        <div className='flex  items-center gap-4'>
                            {books.map((img, index) => (
                                <div key={index} className='w-[80px] h-[80px] border rounded-xl'>
                                    <img className='object-cover w-[80px] h-[80px]' src={img.url} alt="all-cmt" />
                                </div>
                            )).slice(-8)}
                        </div>
                    </div>
                    <div className='my-5 border-t'>
                        <h1 className='my-4 text-3xl'>Lọc theo</h1>
                        <div className='flex gap-4'>
                            <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>Mới nhất</span>
                            <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>Có hình ảnh</span>
                            <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>5 sao</span>
                            <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>4 sao</span>
                            <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>3 sao</span>
                            <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>2 sao</span>
                            <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>1 sao</span>
                        </div>
                    </div>
                    <div className='my-5'>
                        <div className='border-top p-10'>
                            <div className='flex items-center gap-4'>
                                <div className='rounded-full '>
                                    <img className='rounded-full w-[70px] h-[70px]' src="https://static.fandomspot.com/images/08/8574/00-featured-tom-reading-newspaper-meme-template-preview.jpg" alt="user-ava" />
                                </div>
                                <p className='text-3xl'>Ngọc Yến</p>
                            </div>
                            <div className='flex items-center gap-4 my-4'>
                                <p className='text-4xl'>{Star(5, 'yellow')}</p>
                                <p className='text-2xl'>Cực kỳ hài lòng</p>
                            </div>
                            <p className='my-5'>
                                Kế toán khô khan được viết bằng câu từ dí dỏm và bình dân. <br />
                                Mình là đứa không thích những con số, và khi đọc xong sách này, đương nhiên mình vẫn chưa thích, nhưng ít ra đã giúp mình có cái nhìn tổng quan và chi tiết hơn những điều trước nay mình nghĩ rằng "rất khó".
                            </p>
                            <div className='flex  items-center gap-4'>
                                {books.map((img, index) => (
                                    <div key={index} className='w-[80px] h-[80px] border rounded-xl'>
                                        <img className='object-cover w-[80px] h-[80px]' src={img.url} alt="all-cmt" />
                                    </div>
                                )).slice(-3)}
                            </div>
                            <p className='mt-3 text-gray-500 ml-5'>đánh giá vào 6 tháng trước</p>
                        </div>
                        <div className='border-top p-10'>
                            <div className='flex items-center gap-4'>
                                <div className='rounded-full '>
                                    <img className='rounded-full w-[70px] h-[70px]' src="https://static.fandomspot.com/images/08/8574/00-featured-tom-reading-newspaper-meme-template-preview.jpg" alt="user-ava" />
                                </div>
                                <p className='text-3xl'>San San</p>
                            </div>
                            <div className='flex items-center gap-4 my-4'>
                                <p className='text-4xl'>{Star(5, 'yellow')}</p>
                                <p className='text-2xl'>Cực kỳ hài lòng</p>
                            </div>
                            <p className='my-5'>
                                Bằng quầy bán nước chanh của một cậu nhóc tiểu học, mình đã hiểu về kế toán. Sách viết rất hài hước và dễ hiểu. . <br />
                                Sách giao rất nhanh và gói cẩn thận.
                            </p>
                            <div className='flex  items-center gap-4'>
                                {books.map((img, index) => (
                                    <div key={index} className='w-[80px] h-[80px] border rounded-xl'>
                                        <img className='object-cover w-[80px] h-[80px]' src={img.url} alt="all-cmt" />
                                    </div>
                                )).slice(-3)}
                            </div>
                            <p className='mt-3 text-gray-500 ml-5'>đánh giá vào 6 tháng trước</p>
                        </div>
                    </div>
                </div>
            </div>
            <RecommendBook books={books} Star={Star} />
        </div>
    )
}
