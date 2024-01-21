import React from 'react'
import { Link } from 'react-router-dom'
export default function RecommendBook({ books, Star }) {
    return (
        <div>
            <div className='bg-[#ffff] max-w-[1300px]  mx-auto p-10 rounded-lg border mb-8'>
                <h1 className='text-3xl '>Sản phẩm tương tự</h1>
                <div className='h-fit grid grid-cols-7  mt-5 '>
                    {books.map((book, index) => (
                        <Link to={`/collections/${index}`} key={index} className='w-[160px] mx-2 border h-[300px] p-2 mb-4 rounded-md cursor-pointer shadow transform transition-transform duration-300 hover:scale-110 '>
                            <img src={book.url} alt="cover-book" />
                            <p className='text-2xl my-3 pl-2'>{book.title}</p>
                            <div className='flex flex-col px-2'>
                                <span className=''>{Star(book.star, 'yellow')}</span>
                                <span className=''>Đã bán {book.sold}</span>
                            </div>
                            <div className='flex items-center gap-4 my-2 px-2'>
                                <p className='text-3xl'>{book.price}&#8363;</p>
                                <p>-{book.discount}%</p>
                            </div>
                        </Link>
                    )).slice(-7)}
                </div>
            </div>
        </div>
    )
}
