import React, { useMemo, useState } from 'react'
import MyAlert from '../../Components/AlertComponent/Alert'
import { useDispatch, useSelector } from 'react-redux';
import {addBook} from '../../store/cartReducer'
import {PublicRequest} from '../../service/Request'
export default function InfoRight({ books, Star }) {
    const user = useSelector(state => state.user.currentUser)
    const [quantity, setQuantity] = useState(1)   
    const dispatch = useDispatch()
    const discountPrice = useMemo(() => books.original_price -  (books.original_price* books.discount)/100, [])
    const handleQuantityChange = (type) => {
        if(type === 'minus'){
            if(quantity > 1){
                setQuantity(quantity - 1)
            }
        }else{
            setQuantity(quantity + 1)
        }
    }

    const handleAddCart = async () => {
        const user_id = user.user_id
        const book_id = books.book_id
        try {
            await PublicRequest.post('/cart', {user_id, book_id, quantity})
            MyAlert.Alert('success', 'Thêm vào giỏ hàng thành công')
            const CartData = await PublicRequest.get(`/cart/${user_id}`);
            dispatch(addBook(CartData.data));
        } catch (error) {
            MyAlert.Alert(error.response.data)
        }
        
    };


    return (
        <div className='w-full mx-auto'>
            <div className='  *:flex  flex-col mt-5 gap-4 bg-[#ffff] p-10 rounded-xl border'>
                <h2 className='text-6xl mb-8'>
                    {books.title}
                </h2>
                <p className='opacity-85 my-3'>Tác giả: {books.author_name}</p>
                <p className='flex items-center mx-2'>{Star(books.avg_rating, 'yellow')}  (Đánh giá {books.avg_rating} sao)</p>
                <div className='my-10 gap-2 flex flex-col text-3xl'>
                    <div className='flex gap-4 py-4'>
                        <p>Loại sách: </p>
                        <p className=' opacity-70'>{books.category}</p>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex gap-4'>
                            <p>Số lượng còn lại: </p>
                            <p className=''>({books.inStock})</p>
                        </div>
                        <div className='flex gap-4'>
                            <p>Đã bán:</p>
                            <p>({books.quantity_sold})</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-8 items-center'>
                    <span className='text-red-500 text-5xl mt-5'>{books.discount === 0 ? (books.original_price).toLocaleString() : discountPrice?.toLocaleString()}&#8363;</span>
                    <div className='flex items-center mt-5 gap-3'>
                        <p>Giá cũ: </p>
                        <del>{(books.original_price)?.toLocaleString()}&#8363;</del>
                    </div>
                </div>
                <div className='flex items-center gap-6 my-10'>
                    <p>Số lượng:</p>
                    <div className='flex items-center gap-2  text-4xl '>
                        <button onClick={() => handleQuantityChange('minus')} className='border border-[#a4a3a3] hover:bg-[#f47830] py-3 px-3 cursor-pointer rounded-lg'>-</button>
                        <p className='border border-[#a4a3a3] py-3 px-8 rounded-lg'>{quantity}</p>
                        <button onClick={() => handleQuantityChange('plus')} className='border border-[#a4a3a3] hover:bg-[#f47830] py-3 px-3 cursor-pointer rounded-lg'>+</button>
                    </div>
                </div>
                <div className='flex gap-8 my-10'>
                    <button className='py-4 border w-[200px] text-white bg-red-400 rounded-lg hover:opacity-80'>Mua ngay</button>
                    <button onClick={handleAddCart} className='py-4 border w-[200px] text-[#4e84e7] border-[#4e84e7] rounded-lg hover:opacity-80'>Thêm vào giỏ hàng</button>
                </div>
            </div>
            <section className='mx-auto my-4  h-[378px] border rounded-xl p-10 bg-[#ffff]'>
                <h1 className='font-bold text-3xl mb-10 '>Mô tả sản phẩm</h1>
                <p className='text-justify'>
                    {books.short_description}
                </p>
            </section>
        </div>
    )
}

