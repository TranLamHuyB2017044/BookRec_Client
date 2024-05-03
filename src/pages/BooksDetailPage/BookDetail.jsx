/* eslint-disable jsx-a11y/aria-role */
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import InfoLeft from './InfoLeft.jsx';
import InfoRight from './InfoRight.jsx';
import BookRating from './BookRating.jsx';
import Loading from '../../Components/LoadingComponent/Loading.jsx'
import { PublicRequest, FormRequest } from '../../service/Request.js'
import { useNavigate, useParams } from 'react-router-dom';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import myAlert from '../../Components/AlertComponent/Alert.js'
export default function BookDetail() {
    const params = useParams()
    const [ratingImage, setRatingImage] = useState([])
    const [prevAvatar, setPeviewAvatar] = useState([])
    const [showRating, setShowRating] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user.currentUser)
    const [nStar, setNStar] = useState(0)
    const [content, setContent] = useState('')
    const [errorStar, setErrorStar] = useState(false)
    const [errorContent, setErrorContent] = useState(false)
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
            label: `${book.title?.length < 50 ? book.title : book.title?.substring(0, 47) + '...'}`
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
    const { handleSubmit } = useForm({})

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
        setContent('')
    }

    const onSubmit = async () => {
        const user_id = user?.user_id
        try {
            if (nStar === 0) {
                setErrorStar(true)
                return false
            } else if (content === '') {
                setErrorContent(true)
                return false
            }
            else if (user_id == null) {
                myAlert.Alert('info', 'Vui lòng đăng nhập để tiếp tục')
                return false
            }
            else {
                setErrorContent(false)
                setErrorStar(false)
                setLoading(true)
                const formData = new FormData()
                formData.append('user_id', user_id)
                formData.append('content', content)
                formData.append('book_id', parseInt(book_id))
                formData.append('n_star', nStar)
                if (ratingImage.length > 0) {
                    for (let image of ratingImage) {
                        formData.append('url', image)
                    }
                }
                const createRating = await FormRequest.post('/rating', formData)
                if (createRating.status === 200) {
                    myAlert.Alert('success', 'Đánh giá thành công')
                    setShowRating(false)
                    setLoading(false)
                    handleResetRating()
                }
                setTimeout(() => {
                    window.location.reload()
                }, 1500)

            }
        } catch (error) {
            myAlert.Alert('error', 'Có lỗi xảy ra, vui lòng thử lại')
            console.log(error)
            setLoading(false)
        }

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
                    <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-[417px] max-h-[620px]  shadow-md rounded-md left-[550px] top-[35px]  fixed z-2'>
                        {loading ? <Loading /> : <div className=''>
                            <div className='border-b flex justify-between p-3 w-[90%] mx-auto mt-3 items-start max-h-[120px]'>
                                <div className='flex gap-4'>
                                    <img className='w-32 h-32' src={book.thumbnail_url} alt={`cover_${book.title}`} />
                                    <div>
                                        <p>{book.title?.length < 50 ? book.title : book.title?.substring(0, 47) + '...'}</p>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span className='text-5xl cursor-pointer' onClick={() => handleChangeStar(star)} key={star}>{nStar < star ? <StarBorderOutlinedIcon fontSize='lg' style={{ color: 'yellow' }} /> : <StarOutlinedIcon fontSize='lg' style={{ color: 'yellow' }} />}</span>

                                        ))}
                                        {errorStar && <p className='text-red-600'>Vui lòng chọn số sao đánh giá</p>}
                                    </div>
                                </div>
                                <button className='text-5xl -mt-2 cursor-pointer' onClick={handleResetRating}>&times;</button>
                            </div>
                            <div className='mx-auto px-3 h-[420px]'>
                                <h3 className='my-4 ml-4'>Điều gì làm bạn hài lòng ?</h3>
                                <textarea onChange={(e) => setContent(e.target.value)} className='focus:border border-blue border mx-4 px-4 pt-2' name="content" id="content" cols="40" rows="5"
                                    placeholder='Hãy chia sẽ cảm nhận, đánh giá của bạn về sản phẩm này nhé.' />
                                {errorContent && <p className='text-red-600'>Nội dung đánh giá không được để trống</p>}

                                <div>
                                    <div>
                                        {prevAvatar.length > 7 ? <p className='p-4 text-red-600'>Chỉ có thể chọn tối đa 8 ảnh hoặc video</p> : <label htmlFor="rating_img" className='cursor-pointer '>
                                            <img className='w-25 h-25' src="https://static.vecteezy.com/system/resources/previews/008/422/680/non_2x/photo-gallery-album-icon-on-square-button-vector.jpg" alt="gallery-icon" />
                                            <input onChange={handlePreviewAvatar} className='d-none' type="file" multiple={true} id='rating_img' />
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
                        </div>}
                    </form>
                </div>}
            <div className='bg-[#f5f5f5]'>
                <Navbar />
                <Breadcrumbs paths={breadcrumbs} />
                <div className='w-[1300px] flex justify-center gap-8 rounded-lg  mx-auto'>
                    <InfoLeft books={book} />
                    <InfoRight Star={RenderStar} books={book} />
                </div>
                <BookRating Star={RenderStar} book_id={book_id} showRating={() => setShowRating(true)} />
                <GoToTop />
                <Footer />
            </div>
        </div>
    )
}
