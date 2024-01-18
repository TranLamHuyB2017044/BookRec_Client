import React from 'react'
import aboutIMG from '../../assets/about.jpg'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
export default function Introduce() {
  return (
    <div className='w-[80%] mx-auto gap-12 flex items-center justify-center'>
      <img className='w-full flex-1' src={aboutIMG} loading='lazy' alt="about me"/>
      <div className='flex-1 flex flex-col gap-8'>
        <h1 className='font-bold text-7xl text-[#F47830]'>Giới Thiệu Về BookRec</h1>
        <h3 className='text-[#008080] text-4xl'>Công Ty Cổ Phần Sách BookRec</h3>
        <p className='text-[#7e7c7c] max-w-full'>BookRec được biết đến là một trong những thương hiệu hàng đầu về dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư… với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng trên thế giới. Sau 18 năm hình thành và phát triển, Alpha Books đã từng bước khẳng định tên tuổi của mình, đặc biệt đối với các thế hệ doanh nhân, nhà quản lý và những người trẻ luôn khát khao xây dựng sự nghiệp thành công.</p>
        <button className='py-4 rounded-full bg-[#f47830] w-[30%] hover:bg-[#ac7657] text-white flex items-center justify-center gap-5'>XEM THÊM <EastOutlinedIcon/></button>
      </div>
    </div>
  )
}
