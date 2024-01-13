import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Footer from '../../Components/FooterComponent/Footer'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import {books_data} from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
export default function BooksList() {

    function RenderStar(num, color){
        const starArry = [];
        for (let i = 0; i < num; i++) {
            starArry.push(<StarOutlinedIcon key={i} className={`text-${color}`}/>)
        }
        return starArry
    }


    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <div className='w-[1200px] grid grid-cols-4 m-auto my-5 py-5 '>
                <div className='border col-span-1 px-8 pb-8 mx-4 bg-white h-fit'>
                    <section className=' pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Thể loại</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <li className=' cursor-pointer hover:text-[#f47830]'>Sách văn học</li>
                            <li className=' cursor-pointer hover:text-[#f47830]'>Sách kinh tế</li>
                            <li className=' cursor-pointer hover:text-[#f47830]'>Sách công nghệ thông tin</li>
                            <li className=' cursor-pointer hover:text-[#f47830]'>Sách y học</li>
                            <li className=' cursor-pointer hover:text-[#f47830]'>Sách lịch sử</li>
                            <li className=' cursor-pointer hover:text-[#f47830]'>Từ điển</li>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Đánh giá</h2>
                        <ul className='flex flex-col my-6'>
                            <li className='flex gap-4 items-center  cursor-pointer'>
                                {RenderStar(5, 'yellow-300')} <p>từ 5 sao</p>
                            </li>
                            <li className='flex gap-4 items-center cursor-pointer'>
                                {RenderStar(4, 'yellow-300')}{RenderStar(1, 'gray-400')} <p>từ 4 sao</p>
                            </li>
                            <li className='flex gap-4 items-center cursor-pointer'>
                                {RenderStar(3, 'yellow-300')}{RenderStar(2, 'gray-400')} <p>từ 3 sao</p>
                            </li>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Giá</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <li className='cursor-pointer border rounded-xl p-1 w-fit bg-[#e0dddd]'>Dướii 50.000</li>
                            <li className='cursor-pointer border rounded-xl p-1 w-fit bg-[#e0dddd]'>50.000 -&gt; 100.000</li>
                            <li className='cursor-pointer border rounded-xl p-1 w-fit bg-[#e0dddd]'>100.000 -&gt; 200.000</li>
                            <li className='cursor-pointer border rounded-xl p-1 w-fit bg-[#e0dddd]'>Trên 200.000</li>
                            <div>
                                <label htmlFor='price-from' className='opacity-70'>Chọn khoảng giá</label>
                                <div className='mt-5 flex gap-3'>
                                    <input id='price-from' type="number" className='border border-[#ccc] rounded-lg w-[100px] h-12'/>
                                    -
                                    <input id='price-to' type="number" className='border border-[#ccc] rounded-lg w-[100px] h-12'/>
                                </div>
                            </div>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Tác giả</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nguyễn Nhật Ánh</p>
                            </li>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Thích Nhất Hạnh</p>
                            </li>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>DK</p>
                            </li>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Mai Lan Hương</p>
                            </li>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Kim Khánh</p>
                            </li>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Công ty phát hành</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Kim Đồng</p>
                            </li>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Sách Hồng Ân</p>
                            </li>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Alpha Book</p>
                            </li>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>NXB Trẻ</p>
                            </li>
                            <li className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhã Nam</p>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className=' col-span-3  grid grid-cols-4 grid-rows-4 bg-[#f5f5f5]'>
                  {books_data.map((book, index) => (
                    <div key={index} className='w-[200px] mx-2 border h-fit mb-4 rounded-md cursor-pointer shadow  hover:shadow-gray-500'>
                        <img src={book.url} alt="cover-book" />
                        <p className='text-2xl my-3 px-4'>{book.title}</p>
                        <div>
                            <span className='mx-3'>{RenderStar(book.star, 'yellow-300')}</span>
                            <span className='mx-3'>Đã bán {book.sold}</span>
                        </div>
                        <div className='flex items-center gap-4 my-5 px-4'>
                            <p className='text-5xl'>{book.price}&#8363;</p>
                            <p>-{book.discount}%</p>
                        </div>
                    </div>
                  ))}  
                </div>
            </div>
            <GoToTop/>
            <Footer />
        </div>
    )
}
