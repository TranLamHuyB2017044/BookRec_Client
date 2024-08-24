/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/NavBarComponent/Navbar.jsx'
import Footer from '../../Components/FooterComponent/Footer.jsx'
import GoToTop from '../../Components/GoToTopComponent/GoToTop.jsx';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../Components/BreadcrumbsComponent/Breadcrumbs.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Exit, updateCurrentUser } from '../../store/userReducer.js';
import { LogoutCart } from '../../store/cartReducer.js';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MyAlert from '../../Components/AlertComponent/Alert.js'
import { FormRequest } from '../../service/Request.js'
import Loading from '../../Components/LoadingComponent/Loading.jsx'
export default function Account() {
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [fullname, setFullName] = useState('')
    const [avatar, setAvatar] = useState([])
    const [loading, setLoading] = useState(false)
    const breadcrumbs = [
        {
            link: '/',
            label: 'Trang chủ',
        },
        {
            link: '/account',
            label: 'Quản lý tài khoản'
        }

    ]
    const [previewAvatar, setPreviewAvatar] = useState();

    useEffect(() => {
        document.title = 'BookRec - Manager My Account'
      },[])

    const Logout = () => {
        window.location.href = 'http://localhost:5000/auth/logout';
        dispatch(Exit())
        dispatch(LogoutCart())
        window.localStorage.removeItem('persist:root')
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const email = user.email
            const userId = user.user_id
            const userInfo = {
                fullname: fullname || user.fullname,
                user_ava: avatar[0] || user.user_ava
            }
            if (userInfo.fullname === user.fullname  && userInfo.user_ava === user.user_ava) {
                MyAlert.Alert('info', 'Chưa có thông tin được thay đổi')
                return false
            } else {
                setLoading(true)
                const formData = new FormData()
                formData.append('email', email)
                formData.append('fullname', userInfo.fullname)
                formData.append('user_ava', userInfo.user_ava)
                const response = await FormRequest.post(`/user/update/${userId}`, formData)
                setTimeout(() => {
                    if (response.status === 200) {
                        dispatch(updateCurrentUser(response.data))
                        MyAlert.Alert('success', 'Cập nhật thông tin tài khoản thành công')
                        setLoading(false)
                        setShowEditProfile(false)
                    }
                }, 1500)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        return () =>{
            previewAvatar && URL.revokeObjectURL(previewAvatar);
        }
    },[previewAvatar])

    const handleOnchange = (event) => {
        setAvatar(event.target.files);
        const file = event.target.files[0];
        const preAvatar = URL.createObjectURL(file);
        setPreviewAvatar(preAvatar);
    }

    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar />
            <Breadcrumbs paths={breadcrumbs} />
            <div className='lg:h-screen lg:w-[1400px] s:h-fit mx-auto my-8 flex md:flex-row s:flex-col s:w-full gap-32 '>
                <div className='mt-[5rem] basis-1/4'>
                    <div className='flex items-center gap-1 text-4xl'>
                        <h1 className=''>Xin chào, </h1>
                        <h1 className='text-[#f47830] ml-2'> {user.fullname} !</h1>
                    </div>
                    <ul className='mt-16 flex md:flex-col sm:flex-row sm:gap-10 sm:overflow-x-auto gap-5'>
                        <Link to='/account' className='hover:text-[#f47830] cursor-pointer text-[#f47830]'>Thông tin tài khoản</Link>
                        <Link to='/yourOrders' className='hover:text-[#f47830] cursor-pointer'>Đơn hàng của bạn</Link>
                        <Link to='/verifyAccount' className='hover:text-[#f47830] cursor-pointer'>Xác thức email</Link>
                        <Link to='/contact' className='hover:text-[#f47830] cursor-pointer '>Trung tâm hỗ trợ</Link>
                        <Link onClick={Logout} className='hover:text-[#f47830] cursor-pointer'>Đăng xuất</Link>
                    </ul>
                </div>
                {showEditProfile === false ? <div className='mt-[5rem] s:mt-0 basis-3/4'>
                    <h2 className='text-4xl'>THÔNG TIN TÀI KHOẢN</h2>
                    <div className='mt-16 flex flex-col gap-8'>
                        <div className='flex items-center gap-3'>
                            <p className='font-bold'>Họ tên: </p>
                            <p className='opacity-80'>{user.fullname}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='font-bold'>Email: </p>
                            <p className='opacity-80'>{user.email}</p>
                        </div>
                        <button onClick={() => setShowEditProfile(true)} className='active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 mt-2 rounded-md 
                        border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'>Chỉnh sửa</button>
                    </div>
                </div>
                    :
                    <div className='mt-[5rem] basis-3/4'>
                        <h2 className='text-4xl'>CHỈNH SỬA THÔNG TIN TÀI KHOẢN</h2>
                        {loading === false ? <form>
                            <div className='form-group mt-5 flex gap-16 items-center'>
                                <p className='min-w-[200px]'>Ảnh đại diện</p>
                                <div>
                                    <div className='flex gap-16'>
                                        <div>
                                            <div className='w-[130px] h-[130px]'><img className='rounded-lg w-full h-full' src={user.user_ava} alt="user_avatar" /></div>
                                            <p className='mt-5'>Hình ảnh hiện tại</p>
                                        </div>
                                        {previewAvatar && <div>
                                            <div className='w-[130px] h-[130px]'><img className='rounded-lg w-full h-full' src={previewAvatar} alt="user_avatar" /></div>
                                            <p className='mt-5'>Hình ảnh thay đổi</p>
                                        </div>}
                                    </div>
                                    <input className='hidden' onChange={handleOnchange} type="file" id='avatar' />
                                    <label htmlFor="avatar" className='text-[25px] flex justify-center  text-white bg-blue-600 hover:bg-blue-800 rounded-lg w-fit p-2 mt-3 cursor-pointer'>
                                        <FileUploadOutlinedIcon fontSize='inherit' />
                                    </label>
                                </div>
                            </div>
                            <div className='form-group mt-5'>
                                <label className='min-w-[200px]' htmlFor="fullname">Họ và tên</label>
                                <input defaultValue={user.fullname} onChange={(e) => setFullName(e.target.value)} className='w-[300px] h-[40px] border-[1px] px-4 rounded-lg border-[#ccc] focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-[#f47830]' type="text" id='fullname' />
                            </div>

                            <div className='form-group mt-2 flex'>
                                <p className='md:min-w-[200px] s:w-0'></p>
                                <div className='flex gap-8'>
                                    <button type='submit' onClick={handleUpdateUser} className='active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 mt-5 rounded-md 
                                    border border-white bg-[dodgerblue] text-white flex w-[120px] gap-2 justify-center'>Lưu lại</button>
                                    <button onClick={() => setShowEditProfile(false)} type='button' className='active:translate-y-1 hover:bg-gradient-to-r from-red-500 to-red-400 px-4 py-2 mt-5 rounded-md 
                                    border border-white bg-red-500 text-white flex w-[120px] gap-2 justify-center'>Trở về</button>
                                </div>
                            </div>
                        </form> : <Loading setHeight={true}/>}
                    </div>}
            </div>
            <GoToTop />
            <Footer />
        </div>
    )
}
