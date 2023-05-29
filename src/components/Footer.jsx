import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full bg-gray-800 mt-[5rem]'>
      <footer className='container flex justify-between items-center mx-auto text-gray-200 py-6'>
        <div>&copy; 2023 Copyright - Belocated</div>
        <div className='flex gap-4'>
          <Link>Facebook</Link>
          <Link>Twitter</Link>
          <Link>Youtube</Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer