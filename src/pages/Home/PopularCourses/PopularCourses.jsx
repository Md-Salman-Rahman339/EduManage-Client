import React from 'react'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import slide1 from "../../../assets/home/s1.jpg"
import slide2 from "../../../assets/home/s2.jpg"
import slide3 from "../../../assets/home/s3.jpg"
import slide4 from "../../../assets/home/s4.jpg"
import slide5 from "../../../assets/home/s5.jpg"
import SectionTitle from '../../../components/SectionTitle/SectionTitle'

const animation = { duration: 15000, easing: (t) => t }

const PopularCourses = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })

  return (
    <section className="py-10 px-4 sm:px-8 md:px-16 lg:px-24">
    <SectionTitle subHeading={"Here are your courses"}  heading={"Popular Courses"}></SectionTitle>

      <div className="flex justify-center items-center">
        <div
          ref={sliderRef}
          className="keen-slider w-full max-w-4xl h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden "
        >
          <div className="keen-slider__slide number-slide1 relative">
            <img src={slide1} alt="Web Development" className="w-full h-full object-cover" />
            <h3 className="absolute bottom-4 left-0 right-0 text-center text-white text-xl sm:text-2xl md:text-4xl font-bold bg-black/40 py-2">
              Web Development
            </h3>
          </div>
          <div className="keen-slider__slide number-slide2 relative">
            <img src={slide2} alt="Robotics" className="w-full h-full object-cover" />
            <h3 className="absolute bottom-4 left-0 right-0 text-center text-white text-xl sm:text-2xl md:text-4xl font-bold bg-black/40 py-2">
              Robotics
            </h3>
          </div>
          <div className="keen-slider__slide number-slide3 relative">
            <img src={slide3} alt="Machine Learning" className="w-full h-full object-cover" />
            <h3 className="absolute bottom-4 left-0 right-0 text-center text-white text-xl sm:text-2xl md:text-4xl font-bold bg-black/40 py-2">
              Machine Learning
            </h3>
          </div>
          <div className="keen-slider__slide number-slide4 relative">
            <img src={slide4} alt="Machine Learning" className="w-full h-full object-cover" />
            <h3 className="absolute bottom-4 left-0 right-0 text-center text-white text-xl sm:text-2xl md:text-4xl font-bold bg-black/40 py-2">
              Machine Learning
            </h3>
          </div>
          <div className="keen-slider__slide number-slide5 relative">
            <img src={slide5} alt="Machine Learning" className="w-full h-full object-cover" />
            <h3 className="absolute bottom-4 left-0 right-0 text-center text-white text-xl sm:text-2xl md:text-4xl font-bold bg-black/40 py-2">
              Machine Learning
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularCourses
