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

export default function BookDetail() {
    const params = useParams()

    const getId = (slug) => {
        const lastStringInSlug = slug.lastIndexOf('-')
        if (lastStringInSlug !== -1){
            const fullId = slug.substring(lastStringInSlug +1)    
            for (const element of fullId){
                if (isNaN(element)){
                    const book_id = fullId.replace(element, '')
                    return book_id
                }
            }
        }
    }

    const book_id = getId(params.slug)
    const [book, setBooks] = useState({})
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


    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <div className='w-[1300px] flex justify-center gap-8 rounded-lg  mx-auto'>
                <InfoLeft books={book} />
                <InfoRight Star={RenderStar} books={book}/>
            </div>
            <BookRating books={book} Star={RenderStar} />
            <GoToTop />
            <Footer />
        </div>
    )
}
