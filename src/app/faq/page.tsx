// 'use client'

// import { faqData } from '@/components/data/FAQData'
// import { Suspense, useState } from 'react'
// import { AiOutlineHolder } from 'react-icons/ai'

// const FAQ = () => {
// 	const [isActive, setIsActive] = useState(false)

// 	return (
// 		<Suspense>
// 			<div className='w-full h-fit'>
// 				<div className='container flex flex-col items-center mx-auto leading-[1.2]'>
// 					<div className='w-full h-full py-[5rem] mt-[5rem] flex flex-col items-center justify-center mx-auto'>
// 						<h3 className='text-[#0F1741] px-6 text-[30px] md:text-[38px] mb-[5px] font-bold text-center'>
// 							Frequently Asked Questions
// 						</h3>
// 						<p className='flex text-[18px] text-center mx-[1rem] w-fit md:w-[800px] text-gray-600 leading-[1.5]'>
// 							Here are the most frequently asked questions to help you quickly
// 							get the answers to your most common questions
// 						</p>
// 					</div>
// 				</div>

// 				<div className='w-full h-fit flex justify-center py-[5rem] bg-blue-50 '>
// 					<div className='services-list grid md:grid-cols-3 px-10 md:gap-10  w-fit h-fit '>
// 						{faqData?.map((item, index) => (
// 							<div key={index} className='w-fit md:w-full  py-6'>
// 								<div className='flex items-center gap-2 mb-[1rem]'>
// 									{/* <div>
//                 <img src={item?.icon} alt="social Icon" className='w-[25px] h-[25px]'/>
//                 </div> */}

// 									<h1 className='text-[25px] w-fit md:w-[500px] font-bold text-gray-800 leading-[1.4em]'>
// 										{item?.question}
// 									</h1>
// 									<AiOutlineHolder className='rotate-90 text-2xl text-tertiary' />
// 								</div>
// 								<p className='w-fit md:w-[500px] text-[18px] my-6'>
// 									{item?.answer}
// 								</p>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</Suspense>
// 	)
// }

// export default FAQ


'use client'

import { useState } from 'react'
import { faqData } from '@/components/data/FAQData'
import { AiOutlineHolder } from 'react-icons/ai'

interface FAQItem {
  question: string
  answer: string
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Function to toggle the answer visibility
  const toggleAnswer = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div className='w-full h-fit'>
      <div className='container flex flex-col items-center mx-auto leading-[1.2]'>
        <div className='w-full h-full py-[2rem] mt-[2rem] flex flex-col items-center justify-center mx-auto'>
          <h3 className='text-[#0F1741] px-6 text-[30px] md:text-[38px] mb-[5px] font-bold text-center'>
            Frequently Asked Questions
          </h3>
          <p className='flex text-[18px] text-center mx-[1rem] w-fit md:w-[800px] text-gray-600 leading-[1.5]'>
            Here are the most frequently asked questions to help you quickly get the answers to your most common questions
          </p>
        </div>
      </div>

      <div className='w-full h-fit flex justify-center py-[5rem] bg-blue-50'>
       <div className='services-list grid md:grid-cols-3 px-4 md:px-10 gap-4 md:gap-10 max-w-[1200px] w-full'>
          {faqData?.map((item: FAQItem, index: number) => (
            <div key={index} className='w-full md:w-[400px]'>
              <div
                className='flex items-center gap-2 mb-[1rem] cursor-pointer'
                onClick={() => toggleAnswer(index)}
              >
                <h1 className='text-[25px] w-fit md:w-[500px] font-bold text-gray-800 leading-[1.4em]'>
                  {item.question}
                </h1>
                <AiOutlineHolder
                  className={`text-2xl text-tertiary transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-0' : 'rotate-90'
                  }`}
                />
              </div>

              {/* Conditionally render the answer based on the active index */}
              <div
                className={`${
                  activeIndex === index ? 'block' : 'hidden'
                } transition-all duration-300 overflow-hidden`}
              >
                <p className='text-[16px] text-gray-700 mt-2'>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
