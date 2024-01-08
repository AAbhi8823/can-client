import React, { useState } from 'react'
import { BsCircle } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'


const ShareButton = () => {

    const [selectedItem, setSelectedItem] = useState(null);


    const items = [
        { id: 1, label: 'Item 1' },
        { id: 2, label: 'Item 2' },
        { id: 3, label: 'Item 3' },
    ];

    const handleItemSelected = (item) => {
        setSelectedItem(item);
    };


    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ' style={{ backdropFilter: 'blur(1px)' }}>
                <div className='w-[500px] bg-[#FFFFFF] p-4 '>

                    <div className='flex flex-row items-center justify-center relative '>
                        <h1 className=''>Share with your friends</h1>
                        <div>

                        </div>
                    </div>
                    <div className=" relative">

                        <CiSearch size={20} className="absolute top-3 left-2 " />

                        <input
                            placeholder="Search"
                            className=" w-full h-11 outline-none rounded-xl px-10 placeholder:text-[14px] placeholder:font-semibold   bg-[#FEF8FD]  "
                        />
                    </div>

                    <div>
                        
                        <p>{selectedItem ? selectedItem.label : 'No item selected'}</p>
                    </div>

                    <div>
                        {items.map((item) => (
                            <div key={item.id}>
                                <input
                                    type="radio"
                                    id={`item-${item.id}`}
                                    name="items"
                                    value={item.id}
                                    checked={selectedItem === item}
                                    onChange={() => handleItemSelected(item)}
                                />
                                <label htmlFor={`item-${item.id}`}>{item.label}</label>
                            </div>
                        ))}
                    </div>



                </div>
            </div>
        </>
    )
}

export default ShareButton
