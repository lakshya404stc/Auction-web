import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

export const Layout = ({children,title,author,description,keywords}) => {
  return (
    <div>
      <Helmet>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{minHeight:"80vh"}}>
        <Toaster/>
      {children}
      </main>
      <Footer/>
    </div>  
  )
}

Layout.defaultProps=  {
  title:"Auction Web",
  description:"this is the ecommerce app"
}

export default Layout