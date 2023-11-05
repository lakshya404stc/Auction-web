import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi'

const Contact = () => {
  return (
    <Layout title={"contactus"}>
      <div className='row contactus'>
          <div className='col-md-6 '>
            <img src='https://website-assets-fd.freshworks.com/attachments/cktocfdx100g21cfz90plcso3-agent-customer-high-five-02-1.one-half.png' style={{maxWidth:"100%"}} alt='lol what happend i dont know'/>
          </div>
          <div className='col-md-4 '>
            <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
            <p className='text-justify mt-2'>any query or info about any product feel free to contact us, we are available 24/7</p>
            <p>
              <BiMailSend/> : ecommerce@gmail.com
            </p>
            <p>
              <BiPhoneCall/> : 91283012132
            </p>
            <p>
              <BiSupport/> : 1800-0000-0000-0001 (toll free)
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact