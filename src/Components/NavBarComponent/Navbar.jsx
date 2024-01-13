import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
export default function Navbar() {
    return (
        <div className='navbar-container w-full px-5 h-[80px]  flex items-center justify-between  bg-white'>
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
                <li className='hover:text-[#f47830]'>Thể loại</li>
                <Link to='/collections' className='hover:text-[#f47830]'>Nhà sách</Link>
                <li className='hover:text-[#f47830]'>Liên Hệ</li>
            </ul>
            <div className="flex items-center gap-8">
                <div className='flex items-center h-16 border rounded-xl cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pt-0.5 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="ml-2 outline-none bg-transparent font-" type="text" name="search" id="search" placeholder="Search..." />
                </div>
                <Link to='/login' className='hover:text-[#f47830]'>Login</Link>
                <IconButton aria-label="cart">
                    <Badge badgeContent={4} color="warning">
                        <ShoppingCartOutlinedIcon fontSize='large'/>
                    </Badge>
                </IconButton>
            </div>
        </div>
    )
}
