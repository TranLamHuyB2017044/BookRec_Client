import React, { useCallback } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { books_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { Link } from 'react-router-dom';
export default function BookDetail() {

    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/collections',
            label: 'Kệ sách'
        },
        {
            link: `/collections/${0}`,
            label: 'Lý thuyết trò chơi'
        }
    ]

    const RenderStar = useCallback((num, color) => {
        const starArry = [];
        for (let i = 0; i < num; i++) {
            starArry.push(<StarOutlinedIcon key={i} fontSize='lg' style={{ color: color }} />)
        }
        return starArry
    }, [])


    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <div className='w-[1300px] flex justify-center gap-8 rounded-lg  mx-auto'>
                <div>
                    <div className='w-[550px] h-fit mt-5 mb-4 bg-[#fff] p-4 rounded-xl border'>
                        <div className='border-[3px] border-[#f47830]  rounded-lg mx-auto'>
                            <img className='p-5 h-[450px] w-[350px] mx-auto cursor-pointer' src="https://salt.tikicdn.com/cache/280x280/media/catalog/producttmp/42/16/35/086695a87906c6dab22ff7e8147237a8.jpg" alt="cover-img" />
                        </div>
                        <div className='flex justify-between my-4 mx-auto'>
                            {books_data.map((book, index) => (
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
                <div className='w-full mx-auto'>
                    <div className='  *:flex  flex-col mt-5 gap-4 bg-[#ffff] p-10 rounded-xl border'>
                        <h2 className='text-6xl mb-8'>
                            Lý thuyết trò chơi
                        </h2>
                        <p className='opacity-85 my-3'>Tác giả: Trần Phách Hàm</p>
                        <p className='flex items-center'>{RenderStar(5, 'yellow')} (Đánh giá 5 sao)</p>
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
            </div>
            <div className='bg-[#ffff] max-w-[1300px] mx-auto p-10 rounded-lg border mb-4'>
                <h1 className='text-3xl  font-bold'>Đánh giá sản phẩm</h1>
                <div>
                    <div>
                        <p className='my-4 text-3xl'>Tổng quan</p>
                        <div className='my-3'>
                            <p className='text-4xl mb-2'>4.8 {RenderStar(5, 'yellow')}</p>
                            <p>(79 đánh giá)</p>
                        </div>
                        <div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{RenderStar(5, 'yellow')}</p>
                                <div class="progress w-[150px] h-3 mt-[5px]">
                                    <div class="progress-bar w-[80%]" role="progressbar" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>68</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{RenderStar(4, 'yellow')}{RenderStar(1, 'gray')}</p>
                                <div class="progress w-[150px] h-3 mt-[5px]">
                                    <div class="progress-bar w-[8%]" role="progressbar" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>8</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{RenderStar(3, 'yellow')}{RenderStar(2, 'gray')}</p>
                                <div class="progress w-[150px] h-3 mt-[5px]">
                                    <div class="progress-bar w-[2%]" role="progressbar" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>2</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{RenderStar(2, 'yellow')}{RenderStar(3, 'gray')}</p>
                                <div class="progress w-[150px] h-3 mt-[5px]">
                                    <div class="progress-bar w-[0]" role="progressbar" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>0</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{RenderStar(1, 'yellow')}{RenderStar(4, 'gray')}</p>
                                <div class="progress w-[150px] h-3 mt-[5px]">
                                    <div class="progress-bar w-[1%]" role="progressbar" aria-valuenow="70"
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
                            {books_data.map((img, index) => (
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
                                <p className='text-4xl'>{RenderStar(5, 'yellow')}</p>
                                <p className='text-2xl'>Cực kỳ hài lòng</p>
                            </div>
                            <p className='my-5'>
                                Kế toán khô khan được viết bằng câu từ dí dỏm và bình dân. <br />
                                Mình là đứa không thích những con số, và khi đọc xong sách này, đương nhiên mình vẫn chưa thích, nhưng ít ra đã giúp mình có cái nhìn tổng quan và chi tiết hơn những điều trước nay mình nghĩ rằng "rất khó".
                            </p>
                            <div className='flex  items-center gap-4'>
                                {books_data.map((img, index) => (
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
                                <p className='text-4xl'>{RenderStar(5, 'yellow')}</p>
                                <p className='text-2xl'>Cực kỳ hài lòng</p>
                            </div>
                            <p className='my-5'>
                                Bằng quầy bán nước chanh của một cậu nhóc tiểu học, mình đã hiểu về kế toán. Sách viết rất hài hước và dễ hiểu. . <br />
                                Sách giao rất nhanh và gói cẩn thận.
                            </p>
                            <div className='flex  items-center gap-4'>
                                {books_data.map((img, index) => (
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
            <div className='bg-[#ffff] max-w-[1300px]  mx-auto p-10 rounded-lg border mb-8'>
                <h1 className='text-3xl '>Sản phẩm tương tự</h1>
                <div className='h-fit grid grid-cols-7  mt-5 '>
                  {books_data.map((book, index) => (
                    <Link to={`/collections/${index}`} key={index} className='w-[160px] mx-2 border h-[300px] p-2 mb-4 rounded-md cursor-pointer shadow transform transition-transform duration-300 hover:scale-110 '>
                        <img src={book.url} alt="cover-book" />
                        <p className='text-2xl my-3 pl-2'>{book.title}</p>
                        <div className='flex flex-col px-2'>
                            <span className=''>{RenderStar(book.star, 'yellow')}</span>
                            <span className=''>Đã bán {book.sold}</span>
                        </div>
                        <div className='flex items-center gap-4 my-2 px-2'>
                            <p className='text-3xl'>{book.price}&#8363;</p>
                            <p>-{book.discount}%</p>
                        </div>
                    </Link>
                  )).slice(-7)}  
                </div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
