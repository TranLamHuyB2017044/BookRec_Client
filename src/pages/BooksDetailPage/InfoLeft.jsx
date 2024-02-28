
import React, { useState } from 'react'

export default function InfoLeft({ books }) {
    const moreImg = [
        { id: 1, url: books.thumbnail_url},
        { id: 2, url: books.cover_url_1 },
        { id: 3, url: books.cover_url_2 },
        { id: 4, url: books.cover_url_3 },
    ]



    const [image, setImage] = useState(books.thumbnail_url)

    const handleChangeImage = (url) => {
        setImage(url)
    }

    const handleDate =  (date) => {
        const timeIndex = date.lastIndexOf('T')
        let time  = date.substring(timeIndex)
        time = time.replace('T', '').replace('Z', '').replace('.000', '')
        date = date.replace(time, '').replace('T', '').replace('Z', '').replace('.000', '')
        return `${date} / ${time}`
    }
    const publication_date = handleDate(`${books.publication_date}`)
    return (
        <div>
            <div className='w-[550px] h-fit mt-5 mb-4 bg-[#fff] p-4 rounded-xl border'>
                <div className='border-[3px] border-[#f47830]  rounded-lg mx-auto'>
                    <img loading='lazy' className='p-5 h-[450px] w-[350px] mx-auto cursor-pointer' src={image || books.thumbnail_url} alt="cover-img" />
                </div>
                <div className='flex justify-between my-4 mx-auto'>
                    {moreImg.map((img) => (
                        <div key={img.id} className='border-[1px] border-[#f47830] rounded-sm p-1 gap-2 cursor-pointer'>
                            <button onClick={() => handleChangeImage(img.url)} >
                                <img loading='lazy' className=' p-2 w-[110px] h-[110px]' src={img.url} alt="more-img" />
                            </button>
                        </div>))
                    }
                </div>
            </div>
            <section className='mx-auto mb-4  border rounded-xl p-10 bg-[#ffff]'>
                <div className='w-full flex flex-col gap-8'>
                    <h1 className='text-4xl font-bold my-3'>Thông tin chi tiết</h1>
                    <div className='flex justify-between'>
                        <p>Công ty phát hành</p>
                        <p>{books.publisher_name}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Ngày xuất bản</p>
                        <p>{publication_date}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Số trang</p>
                        <p>{books.pages}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Nhà xuất bản</p>
                        <p>{books.manufacturer_name}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
