import React from 'react'
import CANa from '../Photos/CANa.png'
import { useNavigate } from 'react-router-dom';
import './TermsConditions.css'

function PrivacyPolicy() {
  const navigate = useNavigate();
  const handlePath = () => {
    navigate(-1)
  }

  return (
    <>
      <div className='lg:ml-[80px] term-logo  mt-2 lg:absolute flex items-center justify-center ' >
        <img src="/static/media/LogoCAn.fc0060049246719a015b.png" alt="not found" className="w-[80px] h-[80px]" />
        <img src={CANa} alt="not found" className="w-[42.88px] h-[16.19px] "></img>
      </div>
      <div className=' pl-[220px] pt-[100px] main-contant' >
        <div className='flex' >
          <div onClick={handlePath} className='md:mx-[30px] sm:mx-[20px] flex items-center' >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none">
              <path d="M6.93934 17.9393C6.35355 18.5251 6.35355 19.4749 6.93934 20.0607L16.4853 29.6066C17.0711 30.1924 18.0208 30.1924 18.6066 29.6066C19.1924 29.0208 19.1924 28.0711 18.6066 27.4853L10.1213 19L18.6066 10.5147C19.1924 9.92893 19.1924 8.97919 18.6066 8.3934C18.0208 7.80761 17.0711 7.80761 16.4853 8.3934L6.93934 17.9393ZM33 17.5L8 17.5V20.5L33 20.5V17.5Z" fill="black" />
            </svg>
          </div>
          <h1 className='text-main-heading'>
            Privacy <span className='font-bold'>Policy</span>
          </h1>
        </div>

        <div className='text_para main-contant  px-[100px] py-[30px]'>
          <h3 className='text-[30px] terms_text'>
            1. Can User Agreement
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in leo id facilisi consectetur. Lorem est aliquet mauris amet blandit nunc <br /> purus. Ut nisl, cursus lacus sed. Aliquet  consectetur etiam in venenatis augue risus amet velit. Purus lacus lectus tellus viverra arcu. Mi sagittis <br /> amet, tempus commodo tristique vel turpis maecenas. Quis eget lectus euismod augue. Rhoncus tellus duis nulla nec donec tortor neque <br /> duis tortor. Viverra vivamus quis amet, molestie ullamcorper ipsum. Ante molestie integer vestibulum cursus eu purus arcu. Ut dui dui feugiat <br /> velit. Elit, cursus ut elit pharetra purus sed tempus, convallis.
          </p>

          <h3 className='text-[30px] mt-4 terms_text ' >
            2. Terms of use
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in leo id facilisi consectetur. Lorem est aliquet mauris amet blandit nunc <br /> purus. Ut nisl, cursus lacus sed. Aliquet  consectetur etiam in venenatis augue risus amet velit. Purus lacus lectus tellus viverra arcu. Mi sagittis <br /> amet, tempus commodo tristique vel turpis maecenas. Quis eget lectus euismod augue. Rhoncus tellus duis nulla nec donec tortor neque <br /> duis tortor. Viverra vivamus quis amet, molestie ullamcorper ipsum. Ante molestie integer vestibulum cursus eu purus arcu. Ut dui dui feugiat <br /> velit. Elit, cursus ut elit pharetra purus sed tempus, convallis.
          </p>

          <h3 className='text-[30px] mt-4 terms_text ' >
            3. Lorem ipsum dolor
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in leo id facilisi consectetur. Lorem est aliquet mauris amet blandit nunc <br /> purus. Ut nisl, cursus lacus sed. Aliquet  consectetur etiam in venenatis augue risus amet velit. Purus lacus lectus tellus viverra arcu. Mi sagittis <br /> amet, tempus commodo tristique vel turpis maecenas. Quis eget lectus euismod augue. Rhoncus tellus duis nulla nec donec tortor neque <br /> duis tortor. Viverra vivamus quis amet, molestie ullamcorper ipsum. Ante molestie integer vestibulum cursus eu purus arcu. Ut dui dui feugiat <br /> velit. Elit, cursus ut elit pharetra purus sed tempus, convallis.
          </p>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
