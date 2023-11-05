import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Allauctions = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const handleDelete = async (item) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auction/deleteauctionproduct/${item._id}`);
      if (res.data.success === "true") {
        toast.success("item removed from sale");
       
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== item._id));
        
      }
      navigate("/dashboard/createsale")
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auctionsellerId = auth?.user?.auctionsellerid;
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auction/getsinglebiddingproducts`
        ,{
            auctionsellerid:auctionsellerId
        },
        {
            headers: { authorization: auth?.token },
          });
  
        if (response.data.success === "false") {
          toast.error(response.data.message);
        } else {
          setProducts(response.data.allproducts);
        }
      } catch (error) {
        console.log(error);
    }
    };
  
    fetchData();
  }, [auth]);

  return (
    <div className="d-flex flex-wrap">
  {products?.map((item, index) => (
    <div key={index}>
      <div className="card m-3" style={{ width: "18rem", height: "auto" }}>
        <img
          src={`${process.env.REACT_APP_API}/api/v1/auction/auction-photo/${item._id}`}
          className="card-img-top p-3 img"
          alt={item.name}
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title navbar-brand">{item.name}</h5>
          <p style={{ margin: "5px 0" }}>Description: {item.discription}</p>
          <p style={{ margin: "5px 0" }}>Price: ${item.price}</p>
          <div className='card'>
          <div className='card'>
      <button className='btn' onClick={() => handleDelete(item)}>Remove From Sale</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default Allauctions;
