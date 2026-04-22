import React from 'react'
import Hero from '../compnents/Hero'
import CarCard from '../compnents/CarCard'
import About from '../compnents/About'
import Reviews from '../compnents/Reviews'
import Subscription from '../compnents/Subscription'

function Home() {
  return (
    <div className=''>
        <Hero/>
        <CarCard/>
        <About/>
        <Reviews/>
        <Subscription/>
    </div>
  )
}

export default Home