import React, { useEffect, useMemo, useState } from 'react'
// import RecommendBook from './RecommendBook'
import { PublicRequest } from '../../service/Request'


export default function BookRating({ books, Star, book_id, showRating }) {

    const [ratings, setRatings] = useState([])

    useEffect(() => {
        const getUserRatings = async () => {
            try {
                const response = await PublicRequest.get(`/rating/${book_id}`)
                setRatings(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserRatings()

    }, [book_id])


    const handleCreatedTime = (time) => {
        const subTime = time.indexOf('T')
        const newTime = time.substring(0, subTime)
        const date = newTime.split('-')
        const day = date[2]
        const month = date[1]
        const year = date[0]
        const newDate = `${day}-${month}-${year}`
        return newDate
    }


    function isFileImage(file) {
        const acceptedImageTypes = ['jpg', 'jpeg', 'png', 'webp'];
        return file && acceptedImageTypes.includes(file)
    }

    const getFileTypes = (file) => {
        if(typeof(file) === 'string'){
            return file.split('.').pop().toLowerCase();
        }
    }


    const [userRatings, setUserRatings] = useState([])

    useEffect(() => {
        if (ratings.length > 0) {
            const ratingItems = [...ratings]
            const updatedRatingMedia = [];
            ratings.forEach(rating => {
                const media = [];
                if (rating.urls !== null) {
                    const urls = rating.urls.includes(',') ? rating.urls.split(',') : [rating.urls];
                    urls.forEach(item => {
                        console.log(item)
                        const fileType = getFileTypes(item);
                        const isImage = isFileImage(fileType);
                        media.push({ url: item, type: isImage ? 1 : 0 });
                    });
                }
                updatedRatingMedia.push(media);
            });
            const ratingMedia = updatedRatingMedia
            const handleMedia = () => {
                for (let i = 0; i < ratingMedia.length; i++) {
                    ratingItems[i].urls = ratingMedia[i]
                }
                setUserRatings(ratingItems)
            }
            handleMedia()
        }
    }, [ratings])



    return (
        <div>
            <div className='bg-[#ffff] max-w-[1300px] mx-auto p-10 rounded-lg border mb-4'>
                <h1 className='text-3xl  font-bold'>Đánh giá sản phẩm</h1>
                <div>
                    <div>
                        <p className='my-4 text-3xl'>Tổng quan</p>
                        <div className='my-3'>
                            <p className='text-4xl mb-2'>4.8 {Star(5, 'yellow')}</p>
                            <p>(79 đánh giá)</p>
                        </div>
                        <div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(5, 'yellow')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[80%]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>68</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(4, 'yellow')}{Star(1, 'gray')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[8%]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>8</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(3, 'yellow')}{Star(2, 'gray')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[2%]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>2</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(2, 'yellow')}{Star(3, 'gray')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[0]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>0</p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <p className='text-3xl'>{Star(1, 'yellow')}{Star(4, 'gray')}</p>
                                <div className="progress w-[150px] h-3 mt-[5px]">
                                    <div className="progress-bar w-[1%]" aria-valuenow="70"
                                        aria-valuemin="0" aria-valuemax="100" >
                                    </div>
                                </div>
                                <p className='opacity-85 text-2xl mt-1'>1</p>
                            </div>
                        </div>
                    </div>
                    <div className='my-5 border-t'>
                        <h1 className='my-4 text-3xl'>Tất cả hình ảnh (19)</h1>
                        <div className='flex  items-center gap-4'>

                            <div className='w-[80px] h-[80px] border rounded-xl'>
                                <img className='object-cover w-[80px] h-[80px]' src={books.thumbnail_url} alt="all-cmt" />
                            </div>
                        </div>
                    </div>
                    <div className='my-5 border-t'>
                        <h1 className='my-4 text-3xl'>Lọc theo</h1>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-4 items-center'>
                                <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>Mới nhất</span>
                                <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>Có hình ảnh</span>
                                <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>5 sao</span>
                                <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>4 sao</span>
                                <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>3 sao</span>
                                <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>2 sao</span>
                                <span className='border rounded-3xl py-2 px-4 cursor-pointer hover:bg-slate-300'>1 sao</span>
                            </div>
                            <button onClick={showRating} className='mr-8 py-[8px] px-4 bg-red-500 hover:bg-red-600 border text-white rounded-md min-w-[120px] text-center' >Đánh giá</button>
                        </div>
                    </div>
                    <div className='my-5'>
                        {userRatings.length > 0 ? userRatings.map((rating, index) => (
                            <div className='border-top p-10' key={index}>
                                <div className='flex items-center gap-4'>
                                    <div className='rounded-full '>
                                        <img className='rounded-full w-[70px] h-[70px]' src="https://static.fandomspot.com/images/08/8574/00-featured-tom-reading-newspaper-meme-template-preview.jpg" alt="user-ava" />
                                    </div>
                                    <p className='text-3xl'>{rating.fullname}</p>
                                </div>
                                <div className='flex items-center gap-4 my-4'>
                                    <p className='text-4xl'>{Star(rating.n_star, 'yellow')}</p>
                                    {/* <p className='text-2xl'>Cực kỳ hài lòng</p> */}
                                </div>
                                <p className='my-5'>
                                    {rating.content}
                                </p>
                                <div className='flex  items-center gap-4'>
                                    {rating.urls?.length > 1 ? rating?.urls.map((item, id) => (
                                        <div key={id} className='w-[80px] h-[120px] border rounded-xl'>
                                            {item.type === 1 ? (
                                                <img className='cursor-pointer w-full h-full' src={item.url} alt={`img_rating_${index + 1}`} />
                                            ) : <video  className={`cursor-pointer w-full h-full`} controls>
                                                <source src={item.url} type="video/mp4" />
                                            </video>}
                                        </div>)) : ''} 
                                    {rating.urls?.length === 1 && <div className='w-[80px] h-[120px] border rounded-xl'>
                                        {rating.urls[0].type === 1 ? (
                                            <img className={`cursor-pointer w-full h-full`} src={rating.urls[0].url} alt={`img_rating_${index + 1}`} />
                                        ) : <video className={`cursor-pointer w-full h-full`}  controls>
                                            <source src={rating.urls[0].url} type="video/mp4" />
                                        </video>}
                                    </div>}
                                </div>
                                <p className='mt-20 text-gray-500 ml-5 italic opacity-75'>Đã đánh giá vào ngày {handleCreatedTime(rating.created_at)}</p>
                            </div>)) : ''}
                    </div>
                </div>
            </div>
            {/* <RecommendBook books={books} Star={Star} /> */}
        </div>
    )
}
