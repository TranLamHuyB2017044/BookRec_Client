import React, {  useEffect, useState } from 'react'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';
import { PublicRequest } from '../../service/Request.js'
import { Splide, SplideSlide } from '@splidejs/react-splide';
export default function BestSeller() {
  const [bookSeller, setBookSeller] = useState([])
  useEffect(() => {
    const getData = async () => {
      const response = await PublicRequest.get(`/collection/`)
      console.log(response.data.items)
      setBookSeller(response.data.items)
        
    }
    getData()
    const timeoutId = setTimeout(() => {
      getData(); 
    }, 100); 
    return () => clearTimeout(timeoutId);
  }, [  ])
  
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

  return (
    <div className='mt-8 bg-[#fff8f2] py-5 max-h-[500px] overflow-hidden'>
      <h2 className='text-5xl font-bold text-center'>Sách dành cho bạn</h2>
      <div className='flex items-center justify-center my-5'>
        <div className='bg-gray-400 h-[1px] w-[100px] mx-8'></div>
        <AutoStoriesIcon fontSize='large' />
        <div className='bg-gray-400 h-[1px] w-[100px] mx-8'></div>
      </div>
      <Splide
        aria-label="My Favorite Images"
        options={{
          type: 'loop',
          gap: '1rem',
          autoplay: true,
          lazyLoad: 'sequential',
          perPage: 8,
          rewind: true,
          mediaQuery: 'min',
          breakpoints: {
            414: {
              perPage: 2,
            },
            768: {
              perPage: 5,
            },
            1024:{
              perPage: 8,
            }
          }
        }}
      >
        { bookSeller.map((slide) => (
          <SplideSlide key={slide.book_id}>
            <Link to={`/collections/${convertStringToSlug(slide.title)}-p${slide.book_id}`} className='mt-16 '>
              <img loading='lazy' className='w-[200px]  border h-[250px] p-2 mb-4 rounded-md cursor-pointer shadow transform transition-transform duration-300 hover:scale-110 ' src={slide.thumbnail_url} alt='slider-img' />
            </Link>
          </SplideSlide>
        ))
        }
      </Splide>
    </div>
  )
}
