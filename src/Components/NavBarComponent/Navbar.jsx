import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
export default function Navbar() {
    return (
        <div className='navbar-container  w-10/12 flex items-center justify-between mx-auto'>
            <Link to='/'>
                <div className='logo flex items-center cursor-pointer'>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/017/128/657/non_2x/little-boy-kid-reading-book-logo-icon-in-flat-design-vector.jpg"
                        alt="logo"
                        className='w-44 h-40' />
                    <p className='text-4xl  text-[#f47830]'>BookRec</p>
                </div>
            </Link>
            <ul className='nav-bar-items flex items-center gap-8 cursor-pointer'>
                <li className='hover:text-[#f47830]'>Trang chủ</li>
                <li className='hover:text-[#f47830]'>Thể loại</li>
                <li className='hover:text-[#f47830]'>Nhà sách</li>
                <li className='hover:text-[#f47830]'>Tác giả</li>
            </ul>
            <div className="flex items-center gap-8">
                <div className='flex items-center h-16 border rounded-xl cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pt-0.5 text-gray-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="ml-2 outline-none bg-transparent font-" type="text" name="search" id="search" placeholder="Search..." />
                </div>
                <p>Login</p>
                <IconButton aria-label="cart">
                    <Badge badgeContent={4} color="warning">
                        <ShoppingCartOutlinedIcon fontSize='large'/>
                    </Badge>
                </IconButton>
            </div>
        </div>
    )
}
