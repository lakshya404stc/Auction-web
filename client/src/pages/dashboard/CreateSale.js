import React from 'react'
import Layout from '../../components/Layout/Layout'
import Dashboardmenu from '../../components/Layout/Dashboardmenu'
import Createproduct from '../../components/dashboard/Createproduct'

const CreateSale = () => {
  return (
    <Layout>
        <div className='container-fluid text-center' >
          <div className='row'>
            <div className='col-md-3 card m-4 p-3'style={{height:"70vh"}}>
              <h1 className='navbar-brand'>DashBoard</h1>
              <Dashboardmenu/>
            </div>
            <div className='col-md-8 card m-4 p-3 '>
          <Createproduct/>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default CreateSale