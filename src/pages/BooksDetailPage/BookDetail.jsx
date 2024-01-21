/* eslint-disable jsx-a11y/aria-role */
import React, { useCallback } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { books_data } from '../../data.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import InfoLeft from './InfoLeft.jsx';
import InfoRight from './InfoRight.jsx';
import BookRating from './BookRating.jsx';
export default function BookDetail() {

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
            link: `/collections/${0}`,
            label: 'Lý thuyết trò chơi'
        }
    ]

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
                <InfoLeft books={books_data}/>
                <InfoRight Star={RenderStar} />
            </div>
            <BookRating books={books_data} Star={RenderStar} />
            <GoToTop />
            <Footer />
        </div>
    )
}
