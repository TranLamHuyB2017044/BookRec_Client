/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch, useSelector } from 'react-redux';
import { Exit } from '../../store/userReducer';
import { LogoutCart } from '../../store/cartReducer';
import { PublicRequest } from '../../service/Request';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';


export default function Navbar({ resetFilter, filters, filters1, filters2, filters3, filters4, filters5, filters6 }) {
    const [showSubNav, setShowSubNav] = useState(false)
    const [showSubAccount, setShowSubAccount] = useState(false)
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cart)
    const quantity = useMemo(() => cartItem.quantity, [cartItem])
    const [searchText, setSearchText] = useState('')
    const [titleQuery, setTitleQuery] = useState([])
    const [showDrawer, setShowDrawer] = useState(false)
    const [searchImage, setSearchImage] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const Logout = () => {
        window.location.href = 'http://localhost:5000/auth/logout';
        dispatch(Exit())
        dispatch(LogoutCart())
        window.localStorage.removeItem('persist:root')
    }

    const [debouncedQuery, setDebouncedQuery] = useState('');
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(searchText);
        }, 700);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchText]);
    useEffect(() => {
        if (debouncedQuery !== '') {
            const getSearchTitle = async () => {
                const rs = await PublicRequest.get(`collection/books/all?title=${searchText}`)
                setTitleQuery(rs.data)
            }
            getSearchTitle()
        }
    }, [debouncedQuery])



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


    const onShowDrawer = () => {
        setShowDrawer((prev) => !prev)
    }



    return (
        <div className='navbar-container w-full s:justify-between px-5 md:px-0 h-[80px]  flex items-center justify-around  bg-white '>
            {/* Navbar left */}
            <Link to='/'>
                <div className='logo flex items-center cursor-pointer h-fit'>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/017/128/657/non_2x/little-boy-kid-reading-book-logo-icon-in-flat-design-vector.jpg"
                        alt="logo"
                        className='w-40 h-32' />
                    <p className='text-4xl  text-[#f47830]'>BookRec</p>
                </div>
            </Link>
            <ul className='nav-bar-items flex items-center gap-8 cursor-pointer s:hidden lg:flex'>
                <Link to='/' className='hover:text-[#f47830] '>Trang chủ</Link>
                <div onMouseMove={() => setShowSubNav(true)} onMouseLeave={() => setShowSubNav(false)} className='relative h-[80px] mt-[56px]'>
                    <li className='hover:text-[#f47830] '>Thể loại</li>
                    {showSubNav &&
                        <ul className='absolute top-[52px] border-t border-[#f47830] -left-6 w-[200px] flex flex-col gap-4 bg-white z-50'>
                            <Link to={`/collections/?sach-tieng-viet`} onClick={filters} className='hover:text-[#f47830] hover:bg-gray-200 -my-2 py-3 text-start pl-6'>Sách tiếng Việt</Link>
                            <Link to={`/collections/?sach-tam-ly`} onClick={filters1} className='hover:text-[#f47830] hover:bg-gray-200 -my-2 py-3 text-start pl-6'>Sách Tâm Lý </Link>
                            <Link to={`/collections/?sach-kinh-te`} onClick={filters2} className='hover:text-[#f47830] hover:bg-gray-200 -my-2 py-3 text-start pl-6'>Sách kinh tế</Link>
                            <Link to={`/collections/?sach-key-nang`} onClick={filters3} className='hover:text-[#f47830] hover:bg-gray-200 -my-2 py-3 text-start pl-6'>Sách kỹ năng</Link>
                            <Link to={`/collections/?sach-lich-su`} onClick={filters4} className='hover:text-[#f47830] hover:bg-gray-200 -my-2 py-3 text-start pl-6'>Sách lịch sử</Link>
                            <Link to={`/collections/?tieu-thuyet`} onClick={filters5} className='hover:text-[#f47830] hover:bg-gray-200 -my-2 py-3 text-start pl-6'>Tiểu Thuyết</Link>
                            <Link to={`/collections/?sach-y-hoc`} onClick={filters6} className='hover:text-[#f47830] hover:bg-gray-200 -my-2 py-3 text-start pl-6'>Sách y học</Link>
                        </ul>
                    }
                </div>
                <Link to={`/collections`} onClick={resetFilter} className='hover:text-[#f47830]'>Kệ sách</Link>
            </ul>

            {/* Navbar center */}
            {/* repsponsive navbar */}
            <button onClick={onShowDrawer} className='cursor-pointer lg:hidden relative'>
                <FormatListBulletedIcon fontSize='large' />
                <Drawer
                    open={showDrawer}
                    onClose={onShowDrawer}
                    direction='right'
                    size={280}
                    style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
                >
                    <ul>
                        {user ? <div className='border-b-[1px] border-grey flex gap-8  items-center px-10 py-10'>
                            <div className='w-[90px] h-[70px] rounded-full'>
                                <img className='w-full h-full rounded-full' src={user.user_ava} alt="user_avatar" />
                            </div>
                            <div className='flex items-center  flex-wrap'>
                                <p >Xin chào, </p>
                                <p className='text-blue-400'>{user.fullname}</p>
                            </div>
                        </div>
                            :
                            <div className='border-b-[1px] border-grey logo flex items-center justify-start cursor-pointer h-fit'>
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/017/128/657/non_2x/little-boy-kid-reading-book-logo-icon-in-flat-design-vector.jpg"
                                    alt="logo"
                                    className='w-40 h-32' />
                                <p className='text-4xl  text-[#f47830]'>BookRec</p>
                            </div>
                        }
                        <div className='flex flex-col gap-6 ml-5  mt-5'>
                            <div className='flex gap-8 hover:text-[#f47830]'>
                                <AutoStoriesIcon fontSize='large' />
                                <Link to='/collections' >Kệ sách</Link>
                            </div>
                            <div className='flex gap-8 hover:text-[#f47830] '>
                                <ShoppingCartIcon fontSize='large' />
                                <Link to='/cart' >Giỏ hàng</Link>
                            </div>
                            {user ?
                                <div>
                                    <div className='flex gap-8 hover:text-[#f47830]'>
                                        <ManageAccountsIcon fontSize='large' />
                                        <Link to='/account'>Tài khoản</Link>
                                    </div>
                                    <div className=' text-start  hover:text-[#f47830]  pt-4 flex gap-8' onClick={Logout}>
                                        <LogoutIcon fontSize='large' />
                                        Đăng xuất</div>
                                </div>
                                : <div className='flex gap-8 hover:text-[#f47830]'>
                                    <LoginIcon fontSize='large' />
                                    <Link to='/login' >Đăng nhập</Link>
                                </div>}
                        </div>



                    </ul>
                </Drawer>
            </button>
            {/* end repsponsive navbar */}


            {/*Navbar right */}

            <div className="flex items-center gap-8 s:hidden md:flex ">
                

                {/*Input search  */}
                <div className='flex items-center h-16 border rounded-xl cursor-pointer px-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pt-0.5 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input autoComplete='off' onChange={(e) => setSearchText(e.target.value)} value={searchText || ''} className="ml-2 outline-none bg-transparent w-[200px]" type="text" name="search" id="search" placeholder="Search..." />
                    <button onClick={() => setSearchImage(true)}>
                        <ImageSearchIcon fontSize='large' color='orange' />
                    </button>
                </div>
                {
                    titleQuery.length < 1
                        ?
                        <div style={searchText.length === 0 ? { display: 'none' } : { display: 'flex' }} className='flex flex-col items-center gap-1 absolute  z-50 bg-white border-[#f47830] h-[100px] w-[350px] top-[68px]'>
                            <p className='mt-16'>Không tìm thấy kết quả.</p>
                        </div>
                        :
                        <div style={searchText.length === 0 ? { display: 'none' } : { display: 'flex' }} className='flex max-h-[300px] overflow-y-auto   flex-col gap-1 absolute border-t z-50 bg-white border-[#f47830] w-[350px] top-[68px] pb-2'>
                            {titleQuery.map((query) => (
                                <Link to={(`/collections/${convertStringToSlug(query.title)}-p${query.book_id}`)} key={query.book_id} className='cursor-pointer text-start  pl-6 hover:text-[#f47830] hover:bg-gray-200 py-3'>
                                    {(query.title).length > 30 ? (query.title).substring(0, 35) + '...' : query.title}</Link>
                            ))

                            }
                            {/* {titleQuery.length > 5 ? <div className='border-t'>
                                <Link to={`/search/title=${searchText}`} className='ml-20 text-center py-4 hover:text-[dodgerblue] cursor-pointer'>Hiển thị thêm {titleQuery.length - 5} kết quả khác</Link>
                            </div>
                                : ''
                            } */}
                        </div>
                }
                {
                    searchImage && <div className=' flex justify-center items-center  rounded-lg absolute  w-[350px] h-[250px] right-[120px] top-[20px] bg-white z-50'>
                        <div className='flex justify-center items-center border-dashed border-black py-5 px-2  border-[1px] bg-gray-300 w-[300px] h-[180px]'>
                            <button className='absolute top-0 right-5 text-[3rem]' onClick={() => setSearchImage(false)}>&times;</button>
                            <div className='flex justify-center items-center gap-4'>
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 5.5H18.5M18.5 5.5H22M18.5 5.5V9M18.5 5.5V2" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 10.8717 2 9.87835 2.02008 9M12 2C7.28595 2 4.92893 2 3.46447 3.46447C3.03965 3.88929 2.73806 4.38921 2.52396 5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                <div >
                                    <label htmlFor="image-search">
                                        <p className='cursor-pointer underline text-blue-600'>tải tệp lên</p>
                                    </label>
                                    <input type="file" width={0} id='image-search' className='hidden' />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* Notification */}
                {/* <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <IconButton aria-label="notifycation">
                            <Badge badgeContent={2} color="warning">
                                <NotificationsNoneOutlinedIcon  sx={{ fontSize: 25 }} />
                            </Badge>
                        </IconButton>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        color='white'
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem sx={{fontSize: 18}} onClick={handleClose}>Profile</MenuItem>
                        <MenuItem sx={{fontSize: 18}} onClick={handleClose}>My account</MenuItem>
                        <MenuItem sx={{fontSize: 18}} onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div> */}
                {user ? <div>
                    <div className='relative cursor-pointer mt-[55px] h-[80px]' onMouseMove={() => setShowSubAccount(true)} onMouseLeave={() => setShowSubAccount(false)}>
                        <AccountCircleOutlinedIcon fontSize='large' />
                        {
                            showSubAccount && <div className='flex flex-col gap-1 absolute border-t z-50 bg-white border-[#f47830] w-[150px] -left-[120px] top-[52px]'>
                                <Link className=' text-start pl-6 hover:text-[#f47830] hover:bg-gray-200 py-2' to='/account'>Tài khoản</Link>
                                <button className=' text-start pl-6 hover:text-[#f47830] hover:bg-gray-200 py-2' onClick={Logout}>Đăng xuất</button>
                            </div>
                        }
                    </div>
                </div> : <Link to='/login' className='hover:text-[#f47830]'>Login</Link>}
                <Link to='/cart'>
                    <IconButton aria-label="cart">
                        <Badge badgeContent={quantity} color="warning">
                            <ShoppingCartOutlinedIcon fontSize='large' />
                        </Badge>
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}
