import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Exit } from '../../store/userReducer';
export default function Navbar({ resetFilter, filters, filters1, filters2, filters3, filters4, filters5, filters6 }) {
    const [showSubNav, setShowSubNav] = useState(false)
    const [showSubAccount, setShowSubAccount] = useState(false)
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cart)
    const quantity = useMemo(() => cartItem.quantity)
    const Logout = () => {
        window.location.href = 'http://localhost:5000/auth/logout';
        dispatch(Exit())
        window.localStorage.removeItem('persist:root')
    }



    return (
        <div className='navbar-container w-full  px-5 h-[80px]  flex items-center justify-around  bg-white'>
            <Link to='/'>
                <div className='logo flex items-center cursor-pointer h-fit'>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/017/128/657/non_2x/little-boy-kid-reading-book-logo-icon-in-flat-design-vector.jpg"
                        alt="logo"
                        className='w-40 h-32' />
                    <p className='text-4xl  text-[#f47830]'>BookRec</p>
                </div>
            </Link>
            <ul className='nav-bar-items flex items-center gap-8 cursor-pointer '>
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
            <div className="flex items-center gap-8">
                <div className='flex items-center h-16 border rounded-xl cursor-pointer pl-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pt-0.5 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="ml-2 outline-none bg-transparent w-[200px]" type="text" name="search" id="search" placeholder="Search..." />
                </div>
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
