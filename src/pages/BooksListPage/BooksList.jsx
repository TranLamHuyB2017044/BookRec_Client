import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Footer from '../../Components/FooterComponent/Footer'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PublicRequest } from '../../service/Request.js';
export default function BooksList() {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [filters, setFilters] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({ route: '' })
    // const [queryRoute, setQueryRoute] = useState('')
    useEffect(() => {
        const getBooks = async () => {
            try {
                let queryParams = `page=${currentPage}`

                if (filters.length > 0) {
                    const filterString = filters.map(filter => `${filter.type}=${filter.value}`).join('&')
                    queryParams += `&${filterString}`
                    setSearchParams({ route: queryParams });
                    const response = await PublicRequest.get(`/collection?${queryParams}`)
                    setBooks(response.data.data)
                    setTotalPage(response.data.pages.totalPage)
                } else {
                    const response = await PublicRequest.get(`/collection?page=${currentPage}`)
                    // console.log(response.data)
                    const { items, ...other } = response.data
                    setBooks(items)
                    setTotalPage(other.totalPage)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getBooks()
    }, [currentPage, filters, setSearchParams])


    const handleChangePage = (page) => {
        setCurrentPage(page)
        window.scrollTo(0, 0)
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

    const RenderStar = useCallback((num, color) => {
        const starArry = [];
        for (let i = 0; i < num; i++) {
            starArry.push(<StarOutlinedIcon key={i} style={{ color: color }} />)
        }
        return starArry
    }, [])

    const handleFilterClick = (type, value) => {
        window.scrollTo(0, 0)
        setFilters(prevFilters => {
            const existFilterIndex = prevFilters.findIndex(filter => filter.type === type);
            if (existFilterIndex !== -1) {
                const updatedFilters = [...prevFilters];
                updatedFilters.splice(existFilterIndex, 1);
                return [...updatedFilters, { type, value }];
            } else {
                return [...prevFilters, { type, value }];
            }

        });
        setCurrentPage(1);

    };
    const inputRefFrom = useRef(null)
    const inputRefTo = useRef(null)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            if (inputRefFrom.current.value === '' || inputRefTo.current.value === '') {
                return false
            } else {
                handleFilterClick('price', `${inputRefFrom.current.value},${inputRefTo.current.value}`)
                navigate(`/collections/?price=${inputRefFrom.current.value},${inputRefTo.current.value}`)
            }
        }
    }

    const route = searchParams.get('route')
    const resetFilter = () => {
        setFilters([])
        setCurrentPage(1)
    }

    const  boDauTiengViet = function(chuoi) {
        var regex = /[ăâàáảãạăắằẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/g;
        var charMap = {
            'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
            'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
            'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
            'đ': 'd',
            'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
            'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
            'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
            'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
            'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
            'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
            'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
            'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
            'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y'
        };
        return chuoi.replace(regex, function(match) {
            return charMap[match];
        });
    }

    const convertStringToSlug =  (str) => {
        const newString = boDauTiengViet(str)
        return newString.trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '');
    } 

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar resetFilter={resetFilter}
                filters={() => handleFilterClick('category', 'sach tieng viet')}
                filters1={() => handleFilterClick('category', 'sach tam ly tuoi teen')}
                filters2={() => handleFilterClick('category', 'sach tai chinh- tien te')}
                filters3={() => handleFilterClick('category', 'sach ky nang lam viec')}
                filters4={() => handleFilterClick('category', 'lich su viet nam')}
                filters5={() => handleFilterClick('category', 'tieu thuyet')}
                filters6={() => handleFilterClick('category', 'sach y hoc')}
            />
            <Breadcrumbs paths={breadcrumbs} resetFilter={resetFilter} />
            <div className='w-[1200px] grid grid-cols-4 m-auto my-2 py-5'>
                <div className='border col-span-1 px-8 pb-8 mx-4 bg-white h-fit'>
                    <section className=' pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Thể loại</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <Link to={`/collections/?${route}`} className='cursor-pointer hover:text-[#f47830]' onClick={() => handleFilterClick('category', 'Sách tiếng việt')}>Sách tiếng Việt</Link>
                            <Link to={`/collections/?${route}`} className='cursor-pointer hover:text-[#f47830]' onClick={() => handleFilterClick('category', 'Sách Tâm Lý Tuổi Teen')}>Sách Tâm Lý Tuổi Teen</Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('category', 'sach tai chinh- tien te')} className=' cursor-pointer hover:text-[#f47830]'>Sách tài chính - tiền tệ</Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('category', 'sach ky nang lam viec')} className=' cursor-pointer hover:text-[#f47830]'>Sách kỹ năng làm việc</Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('category', 'lich su viet nam')} className=' cursor-pointer hover:text-[#f47830]'>Lịch Sử Việt Nam</Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('category', 'tieu thuyet')} className=' cursor-pointer hover:text-[#f47830]'>Tiểu Thuyết</Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('category', 'sach y hoc')} className=' cursor-pointer hover:text-[#f47830]'>Sách Y Học</Link>
                            <Link to={`/collections`} onClick={resetFilter} className=' cursor-pointer hover:text-[#f47830]'>Tất cả</Link>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Đánh giá</h2>
                        <ul className='flex flex-col my-6'>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('rating', '5')} className='flex gap-4 items-center  cursor-pointer'>
                                {RenderStar(5, '#ffc400')} <p>từ 5 sao</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('rating', '4')} className='flex gap-4 items-center cursor-pointer'>
                                {RenderStar(4, '#ffc400')}{RenderStar(1, 'gray')} <p>từ 4 sao</p>
                            </Link>
                            <Link to={`/collections/?rating=3`} onClick={() => handleFilterClick('rating', '3')} className='flex gap-4 items-center cursor-pointer'>
                                {RenderStar(3, '#ffc400')}{RenderStar(2, 'gray')} <p>từ 3 sao</p>
                            </Link>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Giá</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('price', '0,50000')} className='cursor-pointer border rounded-xl p-1 w-fit bg-[#e0dddd]'>Dưới 50.000</Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('price', '50000,100000')} className='cursor-pointer border rounded-xl p-1 w-fit bg-[#e0dddd]'>50.000 -&gt; 100.000</Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('price', '100000,200000')} className='cursor-pointer border rounded-xl p-1 w-fit bg-[#e0dddd]'>100.000 -&gt; 200.000</Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('price', '200000,1000000')} className='cursor-pointer border rounded-xl p-1 w-fit bg-[#e0dddd]'>Trên 200.000</Link>
                            <div>
                                <label htmlFor='price-from' className='opacity-70'>Chọn khoảng giá</label>
                                <div onKeyDown={handleSubmit} className='mt-5 flex gap-3'>
                                    <input id='price-from' ref={inputRefFrom} type="number" className='border border-[#ccc] rounded-lg w-[100px] h-12 pl-3' />
                                    -
                                    <input id='price-to' ref={inputRefTo} type="number" className='border border-[#ccc] rounded-lg w-[100px] h-12 pl-3' />
                                </div>
                            </div>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Tác giả</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '9173')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Paulo Coelho</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '45726')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Đặng Hoàng Giang</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '14646')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nguyễn Văn Tuấn</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '32762')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Rosie Nguyễn</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '301245')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Tim Marshall</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '15049')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Vladimir Nabokov</p>
                            </Link>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Công ty phát hành</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '5')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhã Nam</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '14')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà xuất bản trẻ</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '19')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>First News - Trí Việt</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '25')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà xuất bản kim đồng</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '30')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Thái Hà</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '7')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Skybooks</p>
                            </Link>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Nhà xuất bản</h2>
                        <ul className='flex flex-col gap-6 my-6'>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '2')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Thanh Niên</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '3')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Thế Giới</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '6')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Dân Trí</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '7')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Văn Học</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '8')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Hà Nội</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '10')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Trẻ</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '11')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Hội Nhà Văn</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '13')} className='flex items-center gap-4 cursor-pointer'>
                                <input type="checkbox" name="" id="" />
                                <p>Nhà Xuất Bản Kim Đồng</p>
                            </Link>
                        </ul>
                    </section>
                </div>
                <div className=' col-span-3 grid grid-cols-4 grid-rows-5 bg-[#f5f5f5]'>
                    {books.map((book, index) => (
                        <Link to={(`/collections/${convertStringToSlug(book.title)}-p${book.book_id}`)} key={index} className='w-[200px] mx-2 border h-[380px] mb-4 rounded-md cursor-pointer shadow  hover:shadow-gray-500 '>
                            <img src={book.thumbnail_url} loading='lazy' alt="cover-book" className='w-[200px] h-[200px] p-2 transform transition-transform duration-300 hover:scale-105' />
                            <p className='text-2xl my-3 pl-3 pr-2 min-h-[80px] max-h-[80px] overflow-hidden'>{book.title}</p>
                            <div className='mb-2 px-3 flex items-center gap-4'>
                                <p className=' text-xl'>{RenderStar(`${Math.floor(book.avg_rating)}`, '#ffc400')}</p>
                                <p className=' text-xl pt-2'>Đã bán {book.quantity_sold}</p>
                            </div>
                            <div className='flex items-center gap-4 p-3'>
                                <p className='text-4xl'>{(book.original_price).toLocaleString()}&#8363;</p>
                                <p>-{book.discount}%</p>
                            </div>
                        </Link>
                    ))}
                    <div className='max-h-[38px] row-start-6 col-start-2 my-8 -ml-6'>
                        {totalPage > 1 ? Array.from({ length: totalPage }, (_, index) => (
                            <Link to={`/collections/?page=${index + 1}`} className='px-4 py-3 rounded-3xl  border ml-4 hover:bg-[#f47830] hover:text-white ' style={index + 1 === currentPage ? { background: '#f47830', color: 'white' } : { background: '', color: '' }} key={index + 1} onClick={() => handleChangePage(index + 1)}>
                                {index + 1}
                            </Link>
                        )) : ''}
                    </div>
                </div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
