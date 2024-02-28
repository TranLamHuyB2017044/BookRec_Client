import React, { useEffect, useState } from 'react'
// import sliderImg from '../../assets/bookStore.jpg'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {Slide} from 'react-slideshow-image'
import { Link } from 'react-router-dom';
import {PublicRequest} from '../../service/Request.js'

export default function BestSeller() {
  const [bookSeller, setBookSeller] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await PublicRequest.get(`/collection/`)
      setBookSeller(response.data.items)
    }
    getData()
  }, [ ])

  const  boDauTiengViet = function(chuoi) {
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
    return chuoi.replace(regex, function(match) {
        return charMap[match];
    });
  }


  const convertStringToSlug =  (str) => {
    const newString = boDauTiengViet(str)
    return newString.trim()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '');
  } 

  return (
    <div className='max-w-screen mt-8 bg-[#fff8f2] py-5 h-[500px]'>
      <h1 className='text-5xl font-bold text-center'>Sách dành cho bạn</h1>
      <div className='flex items-center justify-center my-5'>
        <div className='bg-gray-400 h-[1px] w-[100px] mx-8'></div>
        <AutoStoriesIcon fontSize='large'/>
        <div className='bg-gray-400 h-[1px] w-[100px] mx-8'></div>
      </div>
      <Slide slidesToShow={7} indicators={true}>
        {bookSeller.map((slide) => (
            <Link to={`/collections/${convertStringToSlug(slide.title)}-p${slide.book_id}`} key={slide.book_id} className='mt-16 '>
                <img className='w-[200px]  border h-[250px] p-2 mb-4 rounded-md cursor-pointer shadow transform transition-transform duration-300 hover:scale-110 ' src={slide.thumbnail_url} alt='slider-img'/>
            </Link>
        )).slice(-12)}
      </Slide>
    </div>
  )
}
