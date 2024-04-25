/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'

export default function InfoLeft({ books }) {
    const moreImg = [
        { id: 1, url: books.thumbnail_url },
        { id: 2, url: books.cover_url_1 },
        { id: 3, url: books.cover_url_2 },
        { id: 4, url: books.cover_url_3 },
    ]



    const [thumbnail, setThumbnail] = useState(() => {

        const fileType = books?.thumbnail_url?.split('.').pop().toLowerCase();
        const type = fileType === 'mp4' || fileType === 'mov' ? 0 : 1;
        return {
            url: books?.thumbnail_url,
            type: type
        }
    })

    const handleChangeImage = (url, type) => {
        setThumbnail({ url: url, type: type })
    }
    const [media, setMedia] = useState()

    useEffect(() => {
        const result = moreImg?.map(item => {
            const fileType = item.url?.split('.').pop().toLowerCase();
            const type = fileType === 'mp4' || fileType === 'mov' ? 0 : 1;
            return { id: item.id, url: item?.url, type };
        });

        setMedia(result)
    }, [books])



    const handleDate = (date) => {
        const timeIndex = date.lastIndexOf('T')
        let time = date.substring(timeIndex)
        time = time.replace('T', '').replace('Z', '').replace('.000', '')
        date = date.replace(time, '').replace('T', '').replace('Z', '').replace('.000', '')
        return `${date} / ${time}`
    }
    const publication_date = handleDate(`${books.publication_date}`)


    return (
        <div>
            <div className='w-[550px] h-fit mt-5 mb-4 bg-[#fff] p-4 rounded-xl border'>
                <div className='border-[3px] border-[#f47830]  rounded-lg mx-auto'>
                    {thumbnail.type === 1 ?
                        (<img loading='lazy' className='p-5 h-[450px] w-[350px] mx-auto cursor-pointer' src={thumbnail.url ?? books?.thumbnail_url} alt="thumbnail_book" />)
                        :
                        (<video className={`cursor-pointer p-5 mx-auto w-[600px] h-[450px]`} controls>
                            <source src={thumbnail.url} type="video/mp4" />
                        </video>)
                    }
                </div>
                <div className='flex justify-between my-4 mx-auto'>
                    {media?.map((item) => (
                        <div key={item.id} className='border-[1px] border-[#f47830] rounded-sm p-1 gap-2 cursor-pointer'>
                            {item.type === 1 ? (
                                <img loading='lazy' onClick={() => handleChangeImage(item?.url, 1)} className='cursor-pointer p-2 w-[100px] h-[100px] ' src={item?.url} alt={`cover_img_${item.id + 1}`} />
                            ) : <video onClick={() => handleChangeImage(item?.url, 0)} className={`cursor-pointer p-2 w-[100px] h-[100px]`}>
                                <source src={item?.url} type="video/mp4" />
                            </video>}

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
