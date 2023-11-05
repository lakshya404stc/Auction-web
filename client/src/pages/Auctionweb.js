import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';


const Auctionweb = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [biddingAmount, setBiddingAmount] = useState(''); 
  const navigate = useNavigate();
  const [highestbid,setHighestbid] = useState("")
  const [highestbidder,setHighestbidder] = useState("")


  const bigData = async(item)=>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auction/highestbid/${item._id}`)
    setHighestbid(res.data.highestBid)
    setHighestbidder(res.data.name)

    return res.data.messege

  }

  useEffect(async() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auction/getauctionproducts`
        );
        if (response.data.success === "false") {
          toast.error(response.data.message);
        } else {
          setProducts(response.data.allproducts);
          products.forEach((item) => {
            bigData(item);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    await fetchData();
  },[]);

  const handelbid = async (item) => {
      if (auth?.user !== null) {
          const confirmed = window.confirm(`Are you sure you want to bid on ${item.name} with an amount of ${biddingAmount}?`);

          if (confirmed) {
              try {
                  const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auction/addbid/${item._id}`, {
                      id: auth?.user?.sellerid,
                      biddingprice: biddingAmount,
                  });

                  if (response.data.success === "false") {
                      toast.error(response.data.message);
                  } else {
                      toast.success('Bid placed successfully');
                  }
              } catch (error) {
                  console.log(error);
                  toast.error('Error placing the bid');
              }
          }
      } else {
          navigate('/login');
      }
  };

  return (
    <Layout>
        
    <div className="d-flex flex-wrap text-center border">
    {products.map((item, index) => (
      <div key={index}>

        <div className="card m-3" style={{ width: "16.95rem", height: "auto" }}>
          <img
            src={`${process.env.REACT_APP_API}/api/v1/auction/auction-photo/${item._id}`}
            className="card-img-top p-3 img"
            alt={item.name}
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title navbar-brand">{item.name}</h5>
            <p className="overflow" style={{ margin: "5px 0" }}>Description: {item.discription}</p>
            <p style={{ margin: "5px 0" }}>HighestBid of ${highestbid} by {highestbidder}</p>
            <p><Timer hours={item.timerh} minutes={item.timerm} seconds={item.timers} /></p>
            <div className='card inline-block'>
            <input
                                  type="number"
                                  className="form-control"
                                  id="biddingAmountInput"
                                  placeholder="Enter the bidding amount"
                                  required
                                  value={biddingAmount} 
                                  onChange={(e) => setBiddingAmount(e.target.value)} 
                              />
               <button className="btn" onClick={() => handelbid(item)}>Bid</button>
            </div>
          </div>
        </div>
      </div>
      
    ))}
  </div>

  </Layout>
  );
};
export default Auctionweb