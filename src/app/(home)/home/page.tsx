import CoursesPage from '@/app/components/Coursespage'
import Hero from '@/app/components/Herosection'
import StatsPage from '@/app/components/Statspage'
import TopTutorsSection from '@/app/components/TutorsSection'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Hero/>
        <StatsPage/>
        <CoursesPage/>
        <TopTutorsSection/>

      
    </div>
  )
}

export default Home
