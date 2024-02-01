import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Footer from '../../Components/FooterComponent/Footer'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { Link } from 'react-router-dom';
import { PublicRequest } from '../../service/Request.js';
export default function BooksList() {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        const getBooks = async () =>{
            try {
                const response = await PublicRequest.get(`/api/collection?page=${currentPage}`)
                const {items, ...others} = response.data
                setBooks(items)
                setTotalPage(others.totalPage-2)
            } catch (error) {
                console.log(error)
            }
        }
        getBooks()
    }, [currentPage])


    const handleChangePage = (page) =>{
        setCurrentPage(page)
    }

    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/collections',
            label: 'Kệ sách'
        }
    ]

    const  RenderStar = useCallback((num, color) => {
        const starArry = [];
        for (let i = 0; i < num; i++) {
            starArry.push(<StarOutlinedIcon key={i} style={{color:color}}/>)
        }
        return starArry
    }, [])


    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs}/>
            <div className='w-[1200px] grid grid-cols-4 m-auto my-2 py-5'>
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
                                {RenderStar(5, '#ffc400')} <p>từ 5 sao</p>
                            </li>
                            <li className='flex gap-4 items-center cursor-pointer'>
                                {RenderStar(4, '#ffc400')}{RenderStar(1, 'gray')} <p>từ 4 sao</p>
                            </li>
                            <li className='flex gap-4 items-center cursor-pointer'>
                                {RenderStar(3, '#ffc400')}{RenderStar(2, 'gray')} <p>từ 3 sao</p>
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
                <div className=' col-span-3 grid grid-cols-4 grid-rows-5 bg-[#f5f5f5]'>
                  {books.map((book, index) => (
                    <Link to={`/collections/${index}`} key={index} className='w-[200px] mx-2 border h-[380px] mb-4 rounded-md cursor-pointer shadow  hover:shadow-gray-500 '>
                        <img src={book.thumbnail_url} alt="cover-book" className='w-[200px] h-[200px] p-2 transform transition-transform duration-300 hover:scale-105'/>
                        <p className='text-2xl my-3 pl-3 pr-2 min-h-[80px] max-h-[80px] overflow-hidden'>{book.title}</p>
                        <div className='mb-2 px-3 flex items-center gap-4'>
                            <p className=' text-xl'>{RenderStar(book.avg_rating, '#ffc400')}</p>
                            <p className=' text-xl pt-2'>Đã bán {book.quantity_sold}</p>
                        </div>
                        <div className='flex items-center gap-4 p-3'>
                            <p className='text-4xl'>{(book.original_price).toLocaleString()}&#8363;</p>
                            <p>-{book.discount}%</p>
                        </div>
                    </Link>
                  ))} 
                    <div className='max-h-[38px] col-start-2 my-8 -ml-6'>
                        {Array.from({length: totalPage}, (_, index) => (
                            <Link to={`/collections/?page=${index+1}`} className='px-4 py-3 rounded-3xl  border ml-4 hover:bg-[#f47830] hover:text-white ' style={index+1 === currentPage ? {background: '#f47830', color:'white'} : {background: '', color: ''}} key={index+1} onClick={() => handleChangePage(index+1)}>
                                {index+1}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <GoToTop/>
            <Footer />
        </div>
    )
}
