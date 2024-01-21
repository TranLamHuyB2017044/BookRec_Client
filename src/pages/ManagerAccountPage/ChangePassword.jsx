/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import * as yup from "yup"

export default function ChangePassword() {


    const schema = yup
        .object({
            oldPassword: yup.string().required("Vui lòng nhập mật khẩu cũ"),
            newPassword: yup.string().required("Vui lòng nhập mật khẩu mới").min(8),
            confirmPassword: yup.string().required("Vui lòng xác nhận lại mật khẩu mới").min(8),
        })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    const onLogin = (data) => console.log(data)

    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/account',
            label: 'Quản lý tài khoản'
        },
        {
            link: '/changepassword',
            label: 'Đổi mật khẩu'
        },

    ]


    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <div className='h-screen w-[1400px] mx-auto my-8 flex gap-32'>
                <div className='mt-[5rem] basis-1/4'>
                    <div className='flex items-center gap-1 text-4xl'>
                        <h1 className=''>Xin chào, </h1>
                        <h1 className='text-[#f47830]'>Trần Lâm Huy !</h1>
                    </div>
                    <ul className='mt-16 flex flex-col gap-5 '>
                        <Link to='/account' className='hover:text-[#f47830] cursor-pointer'>Thông tin tài khoản</Link>
                        <Link to='/yourOrders' className='hover:text-[#f47830] cursor-pointer'>Đơn hàng của bạn</Link>
                        <Link to='/changepassword' className='hover:text-[#f47830] cursor-pointer text-[#f47830]'>Đổi mật khẩu</Link>
                        <Link to='' className='hover:text-[#f47830] cursor-pointer'>Đăng xuất</Link>
                    </ul>
                </div>
                <div className='mt-[5rem] basis-3/4'>
                    <h2 className='text-4xl'>ĐỔI MẬT KHẨU</h2>
                    <p className='mt-8 max-w-[45%]'>
                        Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 8 kí tự.
                    </p>
                    <div>
                        <form onSubmit={handleSubmit(onLogin)} className='flex flex-col'>
                            <div className='flex flex-col my-6'>
                                <label htmlFor="oldPassword " className='text-[#616161] font-bold'>Mật khẩu cũ *</label>
                                <input className={`pl-2 w-[420px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.oldPassword ? 'border-[#ff0000]' : 'border-[#ccc]'}`} type='password' id="oldPassword" {...register("oldPassword", { required: true })} />
                                <p className='text-red-600'>{errors.oldPassword?.message}</p>
                            </div>
                            <div className='flex flex-col my-6'>
                                <label htmlFor="newPassword " className='text-[#616161] font-bold'>Mật khẩu mới *</label>
                                <input className={`pl-2 w-[420px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.newPassword ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="newPassword" {...register("newPassword", { required: true })} type="password" />
                                <p className='text-red-600'>{errors.newPassword?.message}</p>
                            </div>
                            <div className='flex flex-col my-6'>
                                <label htmlFor="confirmPassword" className='text-[#616161] font-bold'>Xác nhận lại mật khẩu *</label>
                                <input className={`pl-2 w-[420px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.confirmPassword? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="confirmPassword" {...register("confirmPassword", { required: true })} type="password" />
                                <p className='text-red-600'>{errors.confirmPassword?.message}</p>
                            </div>

                            <button className='flex flex-col mt-6 h-[42px] bg-[#f47830] hover:bg-[#c27952] w-[150px] rounded-xl justify-center items-center cursor-pointer font-bold text-white' type='submit' onKeyDown={onLogin}>Đổi mật khẩu</button>

                        </form>
                    </div>
                </div>
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
