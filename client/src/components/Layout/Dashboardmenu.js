import React from 'react'
import { Link } from 'react-router-dom'

const Dashboardmenu = () => {
  return (
    <div class="list-group">
  <Link to="/dashboard" className="list-group-item list-group-item-action">My products for sale</Link>
  <Link to="/dashboard/createsale" className="list-group-item list-group-item-action">Add product for sale</Link>
  <Link to="/dashboard/orders" className="list-group-item list-group-item-action">Orders</Link>
  <Link to="/dashboard/auctions" className="list-group-item list-group-item-action">products for Auction</Link>
  <Link to="/dashboard/createauctions" className="list-group-item list-group-item-action">add product for Auctions</Link>
</div>
  )
}

export default Dashboardmenu