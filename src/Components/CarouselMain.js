import React from 'react'
import Carousel from './CarouselFunction'
import c1 from '../Photos/c1.png'
import c2 from '../Photos/c2.png'
import c3 from '../Photos/c3.png'
import c4 from '../Photos/c4.png'
import c5 from '../Photos/c5.png'

// const slides = [
//   { image: {c1} , text : 'image 1' },
//   `${c2}`,
//   `${c3}`,
//   `${c4}`,
//   `${c5}`,

// ]
const slides = [
  { id: 1,image: c1, text: 'Image 1' },
  { id: 2,image: c2, text: 'Image 2' },
  { id: 3,image: c3, text: 'Image 3' },
  { id: 4,image: c4, text: 'Image 4' },
  { id: 5,image: c5, text: 'Image 5' },
];

const CarouselMain = () => {
  return (
    <>

      <div className='max-w-lg flex relative'>
        <Carousel>
          {slides.map((slide,index) => (
            <div className='' key={index}>
            <img  src={slide.image} />
            <p className=''>{slide.text}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default CarouselMain