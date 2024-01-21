import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
export default function Navbar() {
    const [showSubNav, setShowSubNav] = useState(false)
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
            <ul className='nav-bar-items flex items-center gap-8 cursor-pointer'>
                <Link to='/' className='hover:text-[#f47830]'>Trang chủ</Link>
                <div onMouseMove={() => setShowSubNav(true)} onMouseOut={() => setShowSubNav(false)} className='relative h-[80px] mt-[5.6rem]'>
                    <li className='hover:text-[#f47830]'>Thể loại</li>
                    {showSubNav &&
                        <ul  className='absolute top-20 border-t border-[#f47830] -left-6 w-[250px] flex flex-col gap-6 bg-white z-50'>
                            <li className='hover:text-[#f47830] hover:bg-gray-200 py-3 px-4'>Sách văn học</li>
                            <li className='hover:text-[#f47830] hover:bg-gray-200 py-3 px-4'>Sách tiếng anh</li>
                            <li className='hover:text-[#f47830] hover:bg-gray-200 py-3 px-4'>Sách kinh tế</li>
                            <li className='hover:text-[#f47830] hover:bg-gray-200 py-3 px-4'>Sách chính trị</li>
                            <li className='hover:text-[#f47830] hover:bg-gray-200 py-3 px-4'>Sách y học</li>
                            <li className='hover:text-[#f47830] hover:bg-gray-200 py-3 px-4'>Sách lịch sử</li>
                        </ul>
                    }
                </div>
                <Link to='/collections' className='hover:text-[#f47830]'>Kệ sách</Link>
            </ul>
            <div className="flex items-center gap-8">
                <div className='flex items-center h-16 border rounded-xl cursor-pointer pl-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pt-0.5 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="ml-2 outline-none bg-transparent w-[200px]" type="text" name="search" id="search" placeholder="Search..." />
                </div>
                <Link to='/login' className='hover:text-[#f47830]'>Login</Link>
                <Link to='/cart'>
                    <IconButton aria-label="cart">
                        <Badge badgeContent={4} color="warning">
                            <ShoppingCartOutlinedIcon fontSize='large' />
                        </Badge>
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}
