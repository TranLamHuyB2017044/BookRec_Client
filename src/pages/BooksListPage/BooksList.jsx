import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar'
import Footer from '../../Components/FooterComponent/Footer'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PublicRequest } from '../../service/Request.js';
export default function BooksList() {
    const [books, setBooks] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [filters, setFilters] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({ route: '' })
    const [currentPage, setCurrentPage] = useState(() => parseInt(searchParams.get('page')) || 1)
    useEffect(() => {
        document.title = 'BookRec - Collections'
    }, [])
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
        // setCurrentPage(1);

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

    const boDauTiengViet = function (chuoi) {
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
        return chuoi.replace(regex, function (match) {
            return charMap[match];
        });
    }

    const convertStringToSlug = (str) => {
        const newString = boDauTiengViet(str)
        return newString.trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
    }


    const mobileCard = `s:w-[95%] s:mx-2 `
    const mobileBookImage = `s:h-[150px]`
    // const mobilePageNavigationUI = `s:flex s:flex-wrap  s:max-w-full s:justify-center s:items-center s:max-h-fit s:col-span-2`
    // const tabletPageNavigationUI = ` md:col-span-3`


    const Pagination = ({ totalPage, currentPage, handleChangePage }) => {
        const pageNumbers = [];
        const siblingCount = 1;

        if (totalPage <= 5) {

            for (let i = 1; i <= totalPage; i++) {
                pageNumbers.push(i);
            }
        } else {
            const firstPageIndex = Math.max(2, currentPage - siblingCount);
            const lastPageIndex = Math.min(totalPage - 1, currentPage + siblingCount);

            pageNumbers.push(1);

            if (firstPageIndex > 2) {
                pageNumbers.push('...')
            }

            for (let i = firstPageIndex; i <= lastPageIndex; i++) {
                pageNumbers.push(i);
            }

            if (lastPageIndex < totalPage - 1) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalPage);
        }

        return (
            <div className="pagination flex items-center col-start-2">
                {pageNumbers.map((page, index) => (
                    page === '...' ? (
                        <span
                            key={index * 10}
                            className="pagination-ellipsis px-4 py-3 flex items-center justify-center">
                            ...
                        </span>
                    ) : (
                        <Link
                            key={page}
                            to={`/collections/?page=${page}`}
                            className={`s:mt-5 px-4 py-3 rounded-3xl border ml-4 hover:bg-[#f47830] hover:text-white ${page === currentPage ? 'bg-[#f47830] text-white' : ''} flex items-center justify-center`}
                            onClick={() => handleChangePage(page)}
                        >
                            {page}
                        </Link>
                    )
                ))}
            </div>
        );
    };

    const [isBookOpen, setIsBookOpen] = useState(false);

    const toggleBookDropdown = () => {
        setIsBookOpen(!isBookOpen);
    };
    const [isAuthorOpen, setIsAuthorOpen] = useState(false);

    const toggleAuthorDropdown = () => {
        setIsAuthorOpen(!isAuthorOpen);
    };
    const [isPublisherOpen, setIsPublisherOpen] = useState(false);

    const togglePublisherDropdown = () => {
        setIsPublisherOpen(!isPublisherOpen);
    };
    const [isManufactureOpen, setIsManufactureOpen] = useState(false);

    const toggleManufactureDropdown = () => {
        setIsManufactureOpen(!isManufactureOpen);
    };
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
            <Breadcrumbs paths={breadcrumbs} />
            <div className='lg:w-[1300px] md:w-full  md:grid-cols-3 grid lg:grid-cols-4 mx-auto my-2 py-5'>
                <div className='border col-span-1 px-8 md:w-[85%] pb-8 bg-white h-fit s:hidden lg:block'>
                    <section className='pt-5'>
                        <button
                            className='cursor-pointer mb-2 flex items-center gap-4'
                            onClick={toggleBookDropdown}
                        >
                            <p className='text-[1.8rem] font-bold'>Thể loại</p>
                            <p className='text-[1.8rem] font-bold'>
                                {isBookOpen ? <KeyboardArrowUpIcon fontSize='inherit' /> : <KeyboardArrowDownIcon fontSize='inherit' />}
                            </p>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isBookOpen ? 'max-h-[400px]' : 'max-h-0'}`}
                        >
                            <ul className='flex flex-col gap-4 my-4 rounded-lg'>
                                <li>
                                    <Link
                                        to={`/collections/?${route}`}
                                        className='block cursor-pointer hover:text-[#f47830] transition-colors'
                                        onClick={() => handleFilterClick('category', 'Sách tiếng Việt')}
                                    >
                                        Sách tiếng Việt
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/collections/?${route}`}
                                        className='block cursor-pointer hover:text-[#f47830] transition-colors'
                                        onClick={() => handleFilterClick('category', 'Sách Tâm Lý Tuổi Teen')}
                                    >
                                        Sách Tâm Lý Tuổi Teen
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/collections/?${route}`}
                                        className='block cursor-pointer hover:text-[#f47830] transition-colors'
                                        onClick={() => handleFilterClick('category', 'sach tai chinh- tien te')}
                                    >
                                        Sách tài chính - tiền tệ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/collections/?${route}`}
                                        className='block cursor-pointer hover:text-[#f47830] transition-colors'
                                        onClick={() => handleFilterClick('category', 'sach ky nang lam viec')}
                                    >
                                        Sách kỹ năng làm việc
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/collections/?${route}`}
                                        className='block cursor-pointer hover:text-[#f47830] transition-colors'
                                        onClick={() => handleFilterClick('category', 'lich su viet nam')}
                                    >
                                        Lịch Sử Việt Nam
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/collections/?${route}`}
                                        className='block cursor-pointer hover:text-[#f47830] transition-colors'
                                        onClick={() => handleFilterClick('category', 'tieu thuyet')}
                                    >
                                        Tiểu Thuyết
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/collections/?${route}`}
                                        className='block cursor-pointer hover:text-[#f47830] transition-colors'
                                        onClick={() => handleFilterClick('category', 'sach y hoc')}
                                    >
                                        Sách Y Học
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/collections`}
                                        className='block cursor-pointer hover:text-[#f47830] transition-colors'
                                        onClick={resetFilter}
                                    >
                                        Tất cả
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className='border-t pt-5'>
                        <button
                            className='cursor-pointer mb-2 flex items-center gap-4'
                            onClick={toggleAuthorDropdown}
                        >
                            <p className='text-[1.8rem] font-bold'>Tác giả</p>
                            <p className='text-[1.8rem] font-bold'>
                                {isAuthorOpen ? <KeyboardArrowUpIcon fontSize='inherit' /> : <KeyboardArrowDownIcon fontSize='inherit' />}
                            </p>
                        </button>
                        <ul className={`flex flex-col gap-6 my-2 overflow-hidden transition-all duration-500 ease-in-out ${isAuthorOpen ? 'max-h-[400px]' : 'max-h-0'}`}>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '9173')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Paulo Coelho</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '45726')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Đặng Hoàng Giang</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '10431')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nguyễn Nhật Ánh</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '32762')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Rosie Nguyễn</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '301245')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Tim Marshall</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '15049')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Vladimir Nabokov</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '7380767')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Lê Bảo Ngọc</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '505125')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Tống Mặc</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '157759')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Jen Sincero</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('author', '113661')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Richard Guare</p>
                            </Link>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <button
                            className='cursor-pointer mb-2 flex items-center gap-4'
                            onClick={togglePublisherDropdown}
                        >
                            <p className='text-[1.8rem] font-bold'>Công ty phát hành</p>
                            <p className='text-[1.8rem] font-bold'>
                                {isPublisherOpen ? <KeyboardArrowUpIcon fontSize='inherit' /> : <KeyboardArrowDownIcon fontSize='inherit' />}
                            </p>
                        </button>
                        <ul className={`flex flex-col gap-6 my-2 overflow-hidden transition-all duration-500 ease-in-out ${isPublisherOpen ? 'max-h-[400px]' : 'max-h-0'}`}>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '5')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhã Nam</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '14')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà xuất bản trẻ</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '19')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>First News - Trí Việt</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '25')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà xuất bản kim đồng</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '30')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Thái Hà</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('publisher', '7')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Skybooks</p>
                            </Link>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <button
                            className='cursor-pointer mb-2 flex items-center gap-4'
                            onClick={toggleManufactureDropdown}
                        >
                            <p className='text-[1.8rem] font-bold'>Nhà xuất bản</p>
                            <p className='text-[1.8rem] font-bold'>
                                {isManufactureOpen ? <KeyboardArrowUpIcon fontSize='inherit' /> : <KeyboardArrowDownIcon fontSize='inherit' />}
                            </p>
                        </button>
                        <ul className={`flex flex-col gap-6 my-2 overflow-hidden transition-all duration-500 ease-in-out ${isManufactureOpen ? 'max-h-[400px]' : 'max-h-0'}`}>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '2')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà Xuất Bản Thanh Niên</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '3')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà Xuất Bản Thế Giới</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '6')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà Xuất Bản Dân Trí</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '7')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà Xuất Bản Văn Học</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '8')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà Xuất Bản Hà Nội</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '10')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà Xuất Bản Trẻ</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '11')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà Xuất Bản Hội Nhà Văn</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('manufacturer', '13')} className='flex items-center gap-4 cursor-pointer'>
                                <p className='hover:text-[#f47830]'>Nhà Xuất Bản Kim Đồng</p>
                            </Link>
                        </ul>
                    </section>
                    <section className='border-t pt-5'>
                        <h2 className='text-[1.8rem] font-bold'>Đánh giá</h2>
                        <ul className='flex flex-col my-6'>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('rating', '5')} className='flex md:my-3 lg:m-0 gap-4 items-center  cursor-pointer'>
                                {RenderStar(5, '#ffc400')} <p className='s:hidden lg:block'>từ 5 sao</p>
                            </Link>
                            <Link to={`/collections/?${route}`} onClick={() => handleFilterClick('rating', '4')} className='flex md:my-3 gap-4 items-center cursor-pointer'>
                                {RenderStar(4, '#ffc400')}{RenderStar(1, 'gray')} <p className='s:hidden lg:block'>từ 4 sao</p>
                            </Link>
                            <Link to={`/collections/?rating=3`} onClick={() => handleFilterClick('rating', '3')} className='flex md:my-3 lg:m-0 gap-4 items-center cursor-pointer'>
                                {RenderStar(3, '#ffc400')}{RenderStar(2, 'gray')} <p className='s:hidden lg:block'>từ 3 sao</p>
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
                                    <input id='price-from' ref={inputRefFrom} type="number" className='border border-[#ccc] rounded-lg w-[100px] md:w-[80px] h-12 pl-3' />
                                    -
                                    <input id='price-to' ref={inputRefTo} type="number" className='border border-[#ccc] rounded-lg w-[100px] md:w-[80px] h-12 pl-3' />
                                </div>
                            </div>
                        </ul>
                    </section>

                </div>
                <div className={`lg:col-span-3 md:col-span-3 grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 s:grid-cols-2 grid-rows-5 bg-[#f5f5f5]`}>
                    {books.map((book, index) => (
                        <Link to={(`/collections/${convertStringToSlug(book.title)}-p${book.book_id}`)} key={index} className={`${mobileCard} lg:w-[230px] md:w-[235px]  mx-2 border h-[380px] mb-4 rounded-md cursor-pointer shadow  hover:shadow-gray-500 `}>
                            <img src={book.thumbnail_url} loading='lazy' alt="cover-book" className={`${mobileBookImage} w-full sm:h-[200px] p-2 transform transition-transform duration-300 hover:scale-105`} />
                            <p className='text-2xl my-3 pl-3 pr-2 min-h-[80px] max-h-[80px] overflow-hidden'>{book.title}</p>
                            <div className='s:flex-col s:items-start s:gap-0 mb-2 px-3 sm:flex-row flex sm:items-center sm:gap-4'>
                                <p className=' text-xl'>{RenderStar(`${Math.floor(book.avg_rating)}`, '#ffc400')}</p>
                                <p className=' text-xl pt-2'>Đã bán {book.quantity_sold}</p>
                            </div>
                            <div className='sm:flex-row flex sm:items-center sm:gap-4 p-3 s:gap-0 s:flex-col-reverse s:items-start'>
                                <p className='text-4xl'>{(book.original_price).toLocaleString()}&#8363;</p>
                                <p>{book.promotion_percent !== null ? `- ${book.promotion_percent}%` : ''}</p>
                            </div>
                        </Link>
                    ))}
                    {totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} handleChangePage={handleChangePage} />}
                </div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
