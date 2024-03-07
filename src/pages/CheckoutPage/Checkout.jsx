/* eslint-disable jsx-a11y/aria-role */
import React, { useCallback, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
// import Footer from '../../Components/FooterComponent/Footer.jsx'
// import { books_data } from '../../data.jsx'
// import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
// import { Link } from 'react-router-dom';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Order from '../../Components/CheckoutComponent/Order.jsx';
import FormCheckout from '../../Components/CheckoutComponent/FormCheckout.jsx';
import Payment from '../../Components/CheckoutComponent/Payment.jsx';
import { useSelector } from 'react-redux';

export default function Checkout() {
    const userInfo = useSelector(state => state.user?.currentUser)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [shipping, setShipping] = useState("");
    const [payment, setPayment] = useState("");
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
    
    const OrderItem = useSelector(state => state.cart)
    console.log(OrderItem.books)
    const TotalPrice = useCallback(items => {
        let total = 0;
        // eslint-disable-next-line array-callback-return
        items.map(item => {
            total += item.quantity * (item.original_price - (item.original_price * item.discount) / 100)
        })
        return total
    }, [])


    const schema = yup
        .object({
            fullname: yup.string().required("Username is required").min(3),
            phone: yup.string().required('Phone number is required'),
            address: yup.string().required(),
        })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        const Formdata = {
            user_id: userInfo.user_id,
            address: data.address,
            phone: data.phone,
            shipping,
            payment,
            total_price: TotalPrice(OrderItem.books)+shippingPrice,
            items:[{
                
            }]
        }
        console.log(Formdata)
    }


    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-3  w-[1300px] mx-auto my-5'>
                    <div className='col-span-1 mx-2'>
                        <FormCheckout 
                            register={register} 
                            errors={errors} 
                            userInfo={userInfo}
                        />
                    </div>
                    <div className='col-span-1 mx-2'>
                        <Payment 
                            setShippingPrice={setShippingPrice} 
                            setShipping={setShipping} 
                            setPayment={setPayment} 
                        />
                    </div>
                    <div className='col-span-1 mx-2'>
                        <Order 
                            price_shipping={shippingPrice} 
                            onSubmit={() => onSubmit} 
                            TotalPrice={TotalPrice}
                            OrderItem ={OrderItem}
                         />
                    </div>
                </div>
            </form>
        </div>
    )
}
