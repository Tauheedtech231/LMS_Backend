import CoursesPage from '@/app/components/Coursespage'
import Footer from '@/app/components/footer'
import Hero from '@/app/components/Herosection'
import Navbar from '@/app/components/navbar'

import React from 'react'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
       
        <CoursesPage/>
       
        <Footer/>

      
    </div>
  )
}

export default Home
