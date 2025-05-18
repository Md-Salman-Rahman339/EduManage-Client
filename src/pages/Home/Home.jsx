import React from 'react'
import Banner from './Banner/Banner'
import Partners from './Partners/Partners'
import PopularCourses from './PopularCourses/PopularCourses'
import Classes from '../Classes/Classes'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
       <PopularCourses></PopularCourses>
      <Partners></Partners>
      <Classes></Classes>
     
    </div>
  )
}

export default Home
