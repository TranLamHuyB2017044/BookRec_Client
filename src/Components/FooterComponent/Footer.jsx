import React from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

export default function Footer() {
    return (
        <div className='max-w-screen'>
            <div className='flex items-center min-h-[200px]  bg-[#f47830] h-[300px]'>
                <div className='flex-1 flex-col flex gap-5 px-20'>
                    <p className='text-white text-6xl font-bold mt-[-3rem] '>BookRec</p>
                    <p className='slogan text-white max-w-[60%] '>"Chúng tôi không bán sách, chúng tôi bán kiến thức quản trị vượt trội của các tập đoàn hàng đầu."</p>
                </div>
                <div className='flex-1 text-white flex flex-col gap-5 py-5 min-h-[200px]'>
                    <h2 className='text-4xl font-bold mb-5'>Chính Sách</h2>
                    <ul className='flex flex-col justify-between gap-5 cursor-pointer'>
                        <li className=' hover:text-black'>Chính sách thanh toán</li>
                        <li className=' hover:text-black'>Chính sách bảo mật</li>
                        <li className=' hover:text-black'>Chính sách đổi trả hoàn tiền</li>
                    </ul>
                </div>
                <div className='flex-1 text-white flex flex-col gap-5 py-5 min-h-[200px] cursor-pointer'>
                    <h2 className='text-4xl font-bold'>Liên Hệ</h2>
                    <p className='flex items-center gap-5 max-w-[60%] hover:text-black'><LocationOnOutlinedIcon fontSize='large'/> Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam</p>
                    <p className='flex items-center gap-5 hover:text-black'><MailOutlineOutlinedIcon fontSize='large'/> tranlamhuy5tn@gmail.com</p>
                    <p className='flex items-center gap-5 hover:text-black'> <PhoneOutlinedIcon fontSize='large'/> 0939419860 </p>
                </div>
            </div>
            <div className='text-center bg-[#363636] text-white py-4'>&copy; Bản quyền thuộc về BookRec | TranLamHuy</div>
        </div>
    )
}
