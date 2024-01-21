/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
// import Footer from '../../Components/FooterComponent/Footer.jsx'
// import { books_data } from '../../data.jsx'
// import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
// import { Link } from 'react-router-dom';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Payment from '../../Components/CheckoutComponent/Payment.jsx';
import Order from '../../Components/CheckoutComponent/Order.jsx';
import FormCheckout from '../../Components/CheckoutComponent/FormCheckout.jsx';

export default function Checkout() {

    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/cart',
            label: 'Giỏ hàng'
        },
        {
            link: '/checkout',
            label: 'Thanh toán'
        }

    ]

    const schema = yup
        .object({
            fullname: yup.string().required("Username is required").min(3),
            email: yup
                .string()
                .required("Email is required")
                .email("email must be mail@example.com"),
            phone: yup.string().required('Phone number is required'),
            address: yup.string().required(),
            city: yup.string().required(),
            district: yup.string().required(),
            wards: yup.string().required(),
        })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => console.log(data)

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-3  w-[1300px] mx-auto my-5'>
                    <div className='col-span-1'>
                        <FormCheckout register={register} errors={errors}/>
                    </div>
                    <div className='col-span-1'>
                        <Payment/>
                    </div>
                    <div className='col-span-1 border'>
                        <Order/>
                    </div>
                </div>
            </form>
        </div>
    )
}
