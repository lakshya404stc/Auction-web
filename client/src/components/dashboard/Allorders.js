import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';




const Allorders = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = auth?.user?._id;
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/getorders/${userId}`
        );
  
        if (response.data.success === "false") {
          toast.error(response.data.message);
        } else {
          setProducts(response.data.products);
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
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
          className="card-img-top p-3 img"
          alt={item.name}
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title navbar-brand">{item.name}</h5>
          <p style={{ margin: "5px 0" }}>Description: {item.discription}</p>
          <p style={{ margin: "5px 0" }}>Price: ${item.price}</p>
          <div className='card'>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default Allorders;
