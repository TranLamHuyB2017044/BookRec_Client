import React from 'react'
import {Fade} from 'react-slideshow-image'
export default function Quote() {
  return (
    <div className=' h-[350px]  mt-5 bg-[#18335e] text-white'>
      <Fade arrows={false} duration={5000}>
        <div className='each-slide max-w-[1200px] mx-auto mt-60 flex flex-col gap-16'>
          <p className='text-3xl text-center italic leading-relaxed'>“Chính từ sách mà những người khôn ngoan tìm được sự an ủi khỏi những rắc rối của cuộc đời.”</p>
          <p className='font-bold text-center text-3xl'>Victor Hugo</p>
        </div>
        <div className='each-slide max-w-[1200px] mx-auto mt-60 flex flex-col gap-16'>
          <p className='text-3xl text-center italic leading-relaxed'>“Tôi tin rằng, nếu có một thứ mà càng mua nhiều lại càng giàu, thì đó là sách. Đọc xong một cuốn sách, nếu nó không giúp bạn giàu lên về mặt tài chính, thì cũng là về mặt trí tuệ. Mà chẳng phải trí tuệ vốn là nguồn gốc của mọi tài sản quý giá nhất mà bạn có thể thấy trên đời hay sao?”</p>
          <p className='font-bold text-center text-3xl'>Khiết Danh</p>
        </div>
        <div className='each-slide max-w-[1200px] mx-auto mt-60 flex flex-col gap-16'>
          <p className='text-3xl text-center italic leading-relaxed'>“Người yêu có thể bỏ ta đi, nhưng sách thì ở lại mãi mãi.”</p>
          <p className='font-bold text-center text-3xl'>Khiết Danh</p>
        </div>
      </Fade>
    </div>
  )
}
