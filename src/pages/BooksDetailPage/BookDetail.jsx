/* eslint-disable jsx-a11y/aria-role */
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
// import { books_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import InfoLeft from './InfoLeft.jsx';
import InfoRight from './InfoRight.jsx';
import BookRating from './BookRating.jsx';
import { PublicRequest } from '../../service/Request.js'
import { useParams } from 'react-router-dom';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useForm } from "react-hook-form"
export default function BookDetail() {
    const params = useParams()
    const [ratingImage, setRatingImage] = useState([])
    const [prevAvatar, setPeviewAvatar] = useState([])
    const [showRating, setShowRating] = useState(false)

    const [nStar, setNStar] = useState(0)
    const getId = (slug) => {
        const lastStringInSlug = slug.lastIndexOf('-')
        if (lastStringInSlug !== -1) {
            const fullId = slug.substring(lastStringInSlug + 1)
            for (const element of fullId) {
                if (isNaN(element)) {
                    const book_id = fullId.replace(element, '')
                    return book_id
                }
            }
        }
    }

    const book_id = getId(params.slug)
    const [book, setBooks] = useState({})
    const boDauTiengViet = function (chuoi) {
        var regex = /[ăâàáảãạăắằẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/g;
        var charMap = {
            'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
            'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
            'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
            'đ': 'd',
            'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
            'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
            'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
            'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
            'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
            'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
            'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
            'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
            'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y'
        };
        return chuoi.replace(regex, function (match) {
            return charMap[match];
        });
    }

    const convertStringToSlug = (str) => {
        const newString = boDauTiengViet(str)
        return newString.trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');
    }
    const slugParams = convertStringToSlug(`${book.title}-p${book_id}`)
    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/collections',
            label: 'Kệ sách'
        },
        {
            link: `/collections/${slugParams}`,
            label: `${book.title}`
        }
    ]




    useEffect(() => {
        try {
            const getOneBook = async () => {
                const resoponse = await PublicRequest.get(`/collection/${book_id}`)
                setBooks(resoponse.data[0])
            }
            getOneBook()
        } catch (error) {
            console.log(error.resoponse.data)
        }
    }, [book_id])

    const RenderStar = useCallback((num, color) => {
        const starArry = [];
        for (let i = 0; i < num; i++) {
            starArry.push(<StarOutlinedIcon key={i} fontSize='lg' style={{ color: color }} />)
        }
        return starArry
    }, [])
    const { register, handleSubmit } = useForm({})

    useEffect(() => {
        return () => {
            prevAvatar && URL.revokeObjectURL(prevAvatar)
        }
    }, [prevAvatar])


    // check type of file
    function isFileImage(file) {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        return file && acceptedImageTypes.includes(file['type'])
    }
    const handlePreviewAvatar = (e) => {
        const files = e.target.files
        let url
        const avatars = []
        for (let image of files) {
            url = URL.createObjectURL(image)
            if (isFileImage(image)) {
                avatars.push({ url: url, type: 1 })
            } else {
                avatars.push({ url: url, type: 0 })
            }
        }
        setPeviewAvatar(avatars)
        setRatingImage(files)
    }

    const handleResetRating = () => {
        setShowRating(false)
        setPeviewAvatar([])
        setRatingImage([])
        setNStar(0)
    }

    const onSubmit = (data) => {
        console.log(data)
        // const formData = new FormData()
        // console.log(nStar)
        // console.log(ratingImage)

    }

    const handleChangeStar = (newStar) => {
        setNStar(newStar)
    }


    const handleDeletePreAva = (id) => {
        if (prevAvatar.length === 1) {
            setPeviewAvatar([])
            setRatingImage([])
        } else {
            prevAvatar.map((avatar, index) => {
                if (id === index) {
                    const deletedAva = prevAvatar.splice(index, 1)
                    const newPreAva = [...prevAvatar, deletedAva]
                    newPreAva.pop()
                    setPeviewAvatar(newPreAva)
                    const arrayRatingImage = Array.from(ratingImage)
                    const deletedFileListElement = arrayRatingImage.splice(index, 1)
                    const newFileList = [...arrayRatingImage, deletedFileListElement]
                    newFileList.pop()
                    setRatingImage(newFileList)
                }
                return avatar
            })
        }
    }

    return (
        <div className='relative'>
            {showRating &&
                <div className='bg-opacity-40 bg-[#585757] border h-[100%] w-[100%] absolute z-100' >
                    <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-[417px]  shadow-md rounded-md left-[550px] top-[35px]  fixed z-2'>
                        <div className='border-b flex justify-between p-3 w-[90%] mx-auto mt-3 items-start'>
                            <div className='flex'>
                                <img className='w-32 h-32' src="https://salt.tikicdn.com/cache/280x280/media/catalog/product/product/e2/77/44/170fa32d7932b634a357b4585333582b.jpg" alt="cover_img" />
                                <div>
                                    <p>Mắt Biếc (Tái Bản 2019)</p>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span className='text-5xl cursor-pointer' onClick={() => handleChangeStar(star)} key={star}>{nStar < star ? <StarBorderOutlinedIcon fontSize='lg' style={{ color: 'yellow' }} /> : <StarOutlinedIcon fontSize='lg' style={{ color: 'yellow' }} />}</span>

                                    ))}
                                    {/* <p className=' cursor-pointer text-5xl mt-3'>{RenderStar(5, 'yellow')}</p> */}
                                </div>
                            </div>
                            <button className='text-5xl -mt-2 cursor-pointer' onClick={handleResetRating}>&times;</button>
                        </div>
                        <div className='mx-auto px-3 h-[420px]'>
                            <h3 className='my-4 ml-4'>Điều gì làm bạn hài lòng ?</h3>
                            <textarea  {...register('content')} className='focus:border border-blue border mx-4 px-4' name="content" id="content" cols="40" rows="5"
                                placeholder='Hãy chia sẽ cảm nhận, đánh giá của bạn về sản phẩm này nhé.' />
                            <div>
                                <div>
                                    {prevAvatar.length > 7 ? <p className='p-4 text-red-600'>Chỉ có thể chọn tối đa 8 ảnh hoặc video</p> : <label htmlFor="rating_img" className='cursor-pointer '>
                                        <img className='w-25 h-25' src="https://static.vecteezy.com/system/resources/previews/008/422/680/non_2x/photo-gallery-album-icon-on-square-button-vector.jpg" alt="gallery-icon" />
                                        <input {...register('url')} onChange={handlePreviewAvatar} className='d-none' type="file" multiple={true} id='rating_img' />
                                    </label>}
                                </div>
                                <div className='flex items-center flex-wrap gap-3 cursor-pointer'>
                                    {prevAvatar.length > 1 && prevAvatar.length < 9 && prevAvatar.map((img, index) => (
                                        <div className='relative' key={index}>
                                            <button type='button' onClick={() => handleDeletePreAva(index)} className='absolute -right-4 -top-5 text-4xl '>&times;</button>
                                            <div className='border-[0.5px] p-2' >
                                                {img.type === 1 ? (
                                                    <img className={`w-[60px] h-[60px]`} src={img.url} alt={`img_rating_${index + 1}`} />
                                                ) : <video className={`w-[60px] h-[60px]`} controls>
                                                    <source src={img.url} type="video/mp4" />
                                                </video>}

                                            </div>
                                        </div>
                                    ))}
                                    {prevAvatar.length > 8 && prevAvatar.map((img, index) => (
                                        <div className='relative' key={index}>
                                            <button type='button' onClick={() => handleDeletePreAva(index)} className='absolute -right-4 -top-5 text-4xl '>&times;</button>
                                            <div className='border-[0.5px] p-2' >
                                                {img.type === 1 ? (
                                                    <img className={`w-[60px] h-[60px]`} src={img.url} alt={`img    _rating_${index + 1}`} />
                                                ) : <video className={`w-[60px] h-[60px]`} controls>
                                                    <source src={img.url} type="video/mp4" />
                                                </video>}

                                            </div>
                                        </div>
                                    )).slice(-8)}
                                    {prevAvatar.length === 1 && <div className='relative'>
                                        <button type='button' onClick={() => handleDeletePreAva(0)} className='absolute -right-4 -top-4 text-4xl '>&times;</button>
                                        <div className='border-[0.5px] p-2 '>
                                            {prevAvatar[0].type === 0 ? <video className='w-[60px] h-[60px]' controls>
                                                <source src={prevAvatar[0].url} type="video/mp4" />
                                            </video> : <img className='w-[60px] h-[60px]' src={prevAvatar[0].url} alt={`img_rating`} />}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className='w-[90%] mx-auto border-t p-4 flex justify-center items-center mb-2'>
                            <button type='submit' className='active:translate-y-1 px-36 py-3 bg-[dodgerblue] hover:bg-gradient-to-r from-blue-500 to-cyan-400  rounded-md text-white '>
                                Gửi đánh giá
                            </button>
                        </div>
                    </form>
            </div>}
            <div className='bg-[#f5f5f5]'>
                <Navbar />
                <Breadcrumbs paths={breadcrumbs} />
                <div className='w-[1300px] flex justify-center gap-8 rounded-lg  mx-auto'>
                    <InfoLeft books={book} />
                    <InfoRight Star={RenderStar} books={book} />
                </div>
                <BookRating books={book} Star={RenderStar} book_id={book_id} showRating={() => setShowRating(true)} />
                <GoToTop />
                <Footer />
            </div>
        </div>
    )
}
