/* eslint-disable jsx-a11y/aria-role */
import React, { useCallback, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Order from '../../Components/CheckoutComponent/Order.jsx';
import FormCheckout from '../../Components/CheckoutComponent/FormCheckout.jsx';
import Payment from '../../Components/CheckoutComponent/Payment.jsx';
import { useSelector } from 'react-redux';
import { PublicRequest } from '../../service/Request.js'
import MyAlert from '../../Components/AlertComponent/Alert.js'
import { useNavigate } from 'react-router-dom';


export default function Checkout() {
    const userInfo = useSelector(state => state.user?.currentUser)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [shipping, setShipping] = useState("");
    const [payment, setPayment] = useState("");
    const navigate = useNavigate()
    const email = useSelector(state => state.user.currentUser.email)
    console.log(email)
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
            customer_name: yup.string().required("customer_name is required").min(3),
            phone: yup.string().required('Phone number is required'),
            address: yup.string().required(),
        })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        try {
            const itemValues = OrderItem.books.map(book => {
                const book_id = book.book_id
                const quantity = book.quantity
                return {
                    book_id,
                    quantity
                }
            })
            const Formdata = {
                user_id: userInfo.user_id,
                customer_name: data.customer_name,
                address: data.address,
                phone: data.phone,
                shipping_method: shipping,
                payment_method: payment,
                total_price: TotalPrice(OrderItem.books) + shippingPrice,
                items: itemValues,
                email: email
            }
            if (shipping === '') {
                MyAlert.Alert('info', 'Vui lòng chọn phương thức giao hàng')
            } else if (payment === '') {
                MyAlert.Alert('info', 'Vui lòng chọn phương thức thanh toán')
            } else if (Formdata.payment_method === 'Thanh toán qua ZaloPay') {
                MyAlert.Alert('info', 'Chức năng thanh toán online sẽ có trong tương lai gần')
            }
            else {
                if(userInfo.verify === 0){
                    MyAlert.Confirm('Xác thực Email ?', 'info', 'Vui lòng xác thực email tại mục tài khoản', 'Xác thực', 'Bỏ qua')
                    .then(async (result) => {
                        if (result.value) {
                            navigate('/verify')
                        }
                    })
                }else{
                    const response = await PublicRequest.post(`/order/`, Formdata)
                    console.log(response.data)
                    MyAlert.Alert(response.data.status, 'Đặt hàng thành công')
                    navigate('/yourOrders')
                }

            }
        } catch (error) {
            MyAlert.Alert('error', error.response.data)
        }
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
                            OrderItem={OrderItem}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
