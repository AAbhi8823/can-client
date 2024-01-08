import React,{useState, useEffect, useRef} from 'react'



const SetPin = ({createPin_open,handlePin}) => {
    const [value, setValue] = useState('');
    // const [createPin_open, setCreatePin_open] = useState(true)
    const pinRef = useRef(null);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };
    const [value1, setValue1] = useState('');
    const pinDivRef = useRef(null);
    const handleClickOutsidePin = (event) => {
        if (createPin_open && pinDivRef.current && !pinDivRef.current.contains(event.target)) {
          handlePin();
        }
      };
      useEffect(() => {
        document.addEventListener("click", handleClickOutsidePin, true);
        return () => {
          document.removeEventListener("click", handleClickOutsidePin, true);
        };
      }, [createPin_open]);

    // const createPin = () => {
    //     setCreatePin_open(!createPin_open)
    // }
    const handleInputChange1 = (event) => {
        const inputValue1 = event.target.value;
        if (/^\d*$/.test(inputValue1)) {
            setValue1(inputValue1);
        }
    };

  return (
    <div  className='fixed inset-0 flex items-center justify-center bg-black p-4 bg-opacity-50 z-50 '
                    style={{ backdropFilter: 'blur(2px)' }}>

                    <div ref={pinDivRef} className='bg-white h-max lg:md:w-[35%] rounded-3xl '>
                        <div className='relative flex py-6 lg:md:px-16 items-center flex-col'>
                           
                            <div className='text-xl font-semibold'>Create a Pin</div>
                            <p className='font-medium  text-center px-4 py-2'>Its your space, so add a profile lock to keep
                                your account information with you</p>
                            <div className=' text-2xl py-1 flex flex-row items-center justify-center w-full  '>

                                <p className='text-xs  font-semibold flex justify-center w-[14%] '>PIN</p>

                                <input
                                    type="text"
                                    value={value}
                                    onChange={handleInputChange}
                                    maxlength="4"
                                    placeholder='__  __  __  __'
                                    className='w-[40%] placeholder:text-3xl placeholder:tracking-[0em] bg-transparent tracking-[1em]  mb-4 outline-none  '

                                />
                            </div>
                            <div className=' text-2xl py-1 flex flex-row items-center justify-center w-full  '>

                                <p className='text-xs  font-semibold flex justify-center w-[14%] '>Re Enter</p>

                                <input
                                    type="text"
                                    value={value1}
                                    onChange={handleInputChange1}
                                    maxlength="4"
                                    placeholder='__  __  __  __'
                                    className='w-[40%] placeholder:text-3xl placeholder:tracking-[0em] bg-transparent tracking-[1em]  mb-4 outline-none  '

                                />
                            </div>
                            <div className='flex flex-row relative pt-5 gap-2 '>
                                <button className='text-center py-[6px] px-5 rounded-xl text-[#7C7C7C] border-2' onClick={handlePin}>Cancel</button>
                                {(value.length === 4 && value === value1) ?
                                    (
                                        <button className='bg-[#C31A7F] text-center py-[6px] px-6 rounded-xl text-white' onClick={handlePin}>Save</button>
                                    )
                                    :
                                    ( <> 
                                        <button className='bg-[#C31A7F] text-center py-[6px] px-6 rounded-xl text-white opacity-50 '>Save</button>
                                        {(value.length===4 && value1.length===4 && value !== value1) && (
                                            <div className='absolute -mt-5 ml-8 text-red-500 text-[12px]'>Values don't match</div>
                                        )}
                                        </> 
                                    )}

                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default SetPin
