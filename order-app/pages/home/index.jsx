import Campains from '@/components/Campains'
import Carousel from '@/components/Carousel'
import MenuWrapper from '@/components/product/MenuWrapper'
import About from '@/components/About'
import React from 'react'
import Reservation from '@/components/Reservation'

function İndex() {
  return (
    <div>
      <Carousel/>
      <Campains/>
      <MenuWrapper/>
      <About/>
      <Reservation/>
    </div> 
  )
}

export default İndex