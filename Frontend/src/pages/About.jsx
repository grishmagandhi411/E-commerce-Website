import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center border-t pt-8'>
           <Title Text1={'ABOUT'} Text2={'US'}/>
      </div>

      <div className=' my-10 flex flex-col sm:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem cupiditate excepturi asperiores quis laboriosam ipsum maiores animi ullam perferendis architecto at nemo, quisquam error iure distinctio culpa vero magnam repellat!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptate, consequatur vitae quos mollitia commodi labore modi nihil quasi magnam.</p>
        <b className='text-gray-800'>OUR MISSION</b>
        <p className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quisquam, laborum quia cupiditate magni maxime quos veritatis officia saepe laudantium corrupti, repellendus perferendis. Eos, cupiditate.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title Text1={'WHY'} Text2={'CHOOSE US'} />
      </div>

       <div className=' flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16  py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil hic illum quis inventore, ad rerum veritatis quod rem consequuntur voluptatum.</p>
      </div>
      <div className='border px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil hic illum quis inventore, ad rerum veritatis quod rem consequuntur voluptatum.</p>
      </div>
      <div className='border px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5 '>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil hic illum quis inventore, ad rerum veritatis quod rem consequuntur voluptatum.</p>
      </div>
      </div>

      <NewsletterBox />
      
    </div>
  )
}

export default About
