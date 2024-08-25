

import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';

const Pricing = () => {
  return (
    <div name='pricing' className='w-full text-white my-24'>
      <div className='w-full h-[800px] bg-gray-800 absolute mix-blend-overlay'></div>

      <div className='max-w-[1240px] mx-auto py-12'>

        <div className='text-center py-8 text-gray-300'>
          <h2 className='text-3xl uppercase'>View Services</h2>
          {/* <h3 className='text-5xl font-bold text-white py-8'>Choose the right plan for your tax needs.</h3> */}
          <p className='text-3xl'>
            Tailored tax management solutions designed for businesses of all sizes. View the service's provided which could serve your needs.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>

          <div className='bg-white text-gray-900 m-4 p-8 rounded-xl shadow-2xl relative'>
            {/* <span className='uppercase px-3 py-1 bg-blue-200 text-blue-900 rounded-2xl text-sm'>Basic</span>
            <div>
              <p className='text-6xl font-bold py-4 flex'>$29<span className='text-xl text-gray-500 flex flex-col justify-end'>/mo</span></p>
            </div> */}
            <p className='text-2xl py-8 text-gray-500'>Essential features for small businesses to manage their taxes effectively.</p>
            <div className='text-2xl'>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Tax filing assistance</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Basic deductions and credits</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Income tracking</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Customer support</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Monthly reports</p>
                <button className='w-full py-4 my-4 bg-blue-500 text-white rounded-lg'>Get Started</button>
            </div>
          </div>

          <div className='bg-white text-gray-900 m-4 p-8 rounded-xl shadow-2xl relative'>
            {/* <span className='uppercase px-3 py-1 bg-blue-200 text-blue-900 rounded-2xl text-sm'>Professional</span>
            <div>
              <p className='text-6xl font-bold py-4 flex'>$99<span className='text-xl text-gray-500 flex flex-col justify-end'>/mo</span></p>
            </div> */}
            <p className='text-2xl py-8 text-gray-500'>Advanced features for comprehensive tax management and optimization.</p>
            <div className='text-2xl'>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Advanced tax strategies</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Maximized deductions and credits</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Expense tracking</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Dedicated tax advisor</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Quarterly reviews</p>
                <button className='w-full py-4 my-4 bg-blue-500 text-white rounded-lg'>Get Started</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;

