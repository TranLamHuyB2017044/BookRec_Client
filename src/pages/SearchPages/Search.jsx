import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PublicRequest } from '../../service/Request';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs';

export default function Search() {
    // const [searchItems, setSearchItems] = useState([])
    // const [debouncedQuery, setDebouncedQuery] = useState('');
    // const searchText = useParams()
    // const SearchParams = searchText.title
    // const searchQuery = (text) => {
    //     const index = text.indexOf('=')
    //     const queryValue = text.substring(index + 1)
    //     return queryValue
    // }

    // const query = searchQuery(SearchParams)
    // useEffect(() => {
    //     const timerId = setTimeout(() => {
    //         setDebouncedQuery(searchText);
    //     }, 700);

    //     return () => {
    //         clearTimeout(timerId);
    //     };
    // }, [searchText]);
    // useEffect(() => {
    //     if (debouncedQuery !== '') {
    //         const getSearchTitle = async () => {
    //             const rs = await PublicRequest.get(`collection/books/all?title=${query}`)
    //             setSearchItems(rs.data)
    //             console.log(rs.data)
    //         }
    //         getSearchTitle()
    //     }
    // }, [debouncedQuery])
    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/search/:title',
            label: 'Kết quả tìm kiếm "atomic"'
        }
    ]
  return (
    <div>
            <Breadcrumbs paths={breadcrumbs}  />

    </div>
  )
}
