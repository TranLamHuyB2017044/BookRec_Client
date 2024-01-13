import { useState, useEffect } from "react"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
function GoToTop() {
    const [goToTop, setGoToTop] = useState(false)
    useEffect(() => {
        const handleScroll = () =>{
            setGoToTop( window.scrollY > 200)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return ( 
        <>
            {goToTop && 
            <div 
            className='bg-[#f47830] rounded-xl p-[10px] fixed right-[20px] bottom-[20px] w-[60px] h-[60px] cursor-pointer z-[13]'
            onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}
            >
                <KeyboardArrowUpOutlinedIcon 
                    style={{
                        width: '40px',
                        height: '40px',
                        color: 'white'
                    }}
                />
            </div>
        }
        </>
    );
}

export default GoToTop;