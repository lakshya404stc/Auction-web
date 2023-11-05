import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='footer'>
      <h4 className='text-center'>All Rights Reserved &copy; Lakshya Gupta</h4>
      <p className='text-center mt-3 '>
        <Link to="/contact">Contact</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/policy">Policy</Link> 
      </p>
    </div>
  )
}

export default Footer