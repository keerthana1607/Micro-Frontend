


import React from 'react';

const About = () => {
  return (
    <div name='about' className='w-full my-32'>
      <div className='max-w-[1240px] mx-auto'>
        <div className='text-center'>
          <h2 className='text-5xl font-bold'>Trusted by Businesses for Seamless Tax Management</h2>
          <p className='text-3xl py-6 text-gray-500'>
            Our tax management and calculation system is designed to simplify tax processes and ensure accuracy.
            Join the many businesses that rely on us for efficient tax solutions.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 px-2 text-center'>
          <div className='border py-8 rounded-xl shadow-xl'>
            <p className='text-6xl font-bold text-green-600'>99.9%</p>
            <p className='text-gray-400 mt-2'>Accuracy</p>
          </div>
          <div className='border py-8 rounded-xl shadow-xl'>
            <p className='text-6xl font-bold text-green-600'>24/7</p>
            <p className='text-gray-400 mt-2'>Support</p>
          </div>
          <div className='border py-8 rounded-xl shadow-xl'>
            <p className='text-6xl font-bold text-green-600'>10K+</p>
            <p className='text-gray-400 mt-2'>Businesses Served</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
