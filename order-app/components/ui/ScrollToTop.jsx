import React, { useState,useEffect } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
function ScrollToTop() {
    const [isVisible,setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop> 200)
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
  return (
    <div>
        <button
      className={`fixed right-[20px] bottom-[20px] bg-primary text-white  rounded-full  h-10 w-10 p-2 text-center flex text-[20px] pointer transition-all  ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <ArrowUpwardIcon/>
    </button>
    </div>
  )
}

export default ScrollToTop