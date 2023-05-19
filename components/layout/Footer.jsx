import React from 'react';

 const Footer = ({ openSans }) => {
  return (
    <footer className={ `${openSans.variable} font-openSans p-6` }>
      <div className="w-full">
        <div className="flex flex-wrap -m-2">
          <div className="w-full md:w-1/2 px-2">
            <p className='text-light-ash text-[13px]'>
              &copy; Copyright 2022 | <a href="#" className='text-[#1381E7]'>NSL</a>
            </p>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <p className='text-[13px] md:text-right'>
              <a href="#" className='text-light-ash'>Terms & Condition</a> | 
              <a href="#" className='text-light-ash'> Help Center</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer