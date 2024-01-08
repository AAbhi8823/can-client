import React from 'react'
import Page from '../Layouts/Pages'
// import Helpafriend from '../Photos/Helpafriend.png'
import shareAfriend from '../Photos/shareAfriend.png'

const HelpAFriend = () => {
  return (
    <Page pageContent={(
        <>
                <div className='bg-[#FEF8FD] w-full flex flex-col items-center gap-2 py-20 md:py-10 h-full overflow-hidden'
                 style={{ backgroundImage: `url(${shareAfriend})`,
                 backgroundRepeat: 'no-repeat',
                 height:'100vh',
                 justifyContent:'center',
                 backgroundSize:'120% 60%',
                '@media (min-width: 768px)': {
                 backgroundSize: '100% 80%', 
                 },
                 backgroundPosition:'bottom'}}>
                    {/* background */}
                    <div><h2 className="text-heading text-[36px] font-[500] leading-60">Help a Friend</h2></div>
                               
                                <div className=' text-center  mb-4'>
                                   <p className=' text-[18px] text-[#000] font-[500] '>Had a good experience?<br/>Share it with the once in need.</p> 
                                </div>
                                
                                    <div className='flex flex-row font-[500] text-[16px]  items-center justify-center'>
                                        <label className='px-1  bg-white w-fit rounded-[16px] border-[0.5px] border-[#e1e1e1]' style={{boxShadow:' 0px 10px 30px 0px rgba(0, 0, 0, 0.05)'}}>http://website.com/541254
                                        <button className={` bg-[#C31A7F] right-0 text-white font-[500] text-[18px] px-4 py-2 rounded-[16px] ml-10 my-0 cursor-pointer`} style={{boxShadow:'0px 5px 30px rgba(0, 0, 0, 0.05)'}}>Copy</button>
                                        </label>
                                    </div>
                        </div>
                        </> )}/>
    
  )
}

export default HelpAFriend