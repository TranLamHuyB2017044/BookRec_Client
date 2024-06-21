import {Fade} from 'react-slideshow-image'
export default function Quote() {
  return (
    <div className=' h-[350px] md:h-[300px] s:h-[150px]  mt-5 bg-[#18335e] text-white'>
      <Fade arrows={false} duration={3000}>
        <div className='each-slide lg:w-full mx-auto lg:mt-60 md:mt-44 flex flex-col gap-16 h-[350px] s:max-w-[60%] md:max-w-[80%] s:mt-10'>
          <p className='lg:text-3xl text-center italic leading-relaxed s:text-sm'>“Chính từ sách mà những người khôn ngoan tìm được sự an ủi khỏi những rắc rối của cuộc đời.”</p>
          <p className='font-bold text-center text-3xl s:text-md'>Victor Hugo</p>
        </div>
        <div className='each-slide lg:w-full mx-auto lg:mt-60 md:mt-28 flex flex-col gap-16 h-[350px]  s:max-w-[60%]md:max-w-[80%] s:mt-10'>
          <p className='lg:text-3xl  text-center italic leading-relaxed s:text-sm'>“Tôi tin rằng, nếu có một thứ mà càng mua nhiều lại càng giàu, thì đó là sách. Đọc xong một cuốn sách, nếu nó không giúp bạn giàu lên về mặt tài chính, thì cũng là về mặt trí tuệ. Mà chẳng phải trí tuệ vốn là nguồn gốc của mọi tài sản quý giá nhất mà bạn có thể thấy trên đời hay sao?”</p>
          <p className='font-bold text-center text-3x s:text-mdl'>Khiết Danh</p>
        </div>
        <div className='each-slide lg:w-full mx-auto lg:mt-60 md:mt-48 flex flex-col gap-16 h-[350px] s:max-w-[60%] md:max-w-[80%] s:mt-10'>
          <p className='lg:text-3xl text-center italic leading-relaxed s:text-sm'>“Người yêu có thể bỏ ta đi, nhưng sách thì ở lại mãi mãi.”</p>
          <p className='font-bold text-center text-3x s:text-mdl'>Khiết Danh</p>
        </div>
      </Fade>
    </div>
  )
}
