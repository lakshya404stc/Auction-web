import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';



const Homepage = () => {
  const [auth] = useAuth()
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const handelbuy = async(item)=>{
      
     if (auth?.user !== null) {
       const confirmed = window.confirm(`Are you sure you want to buy ${item.name}?`);
       if (confirmed) {
         try {
           const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/buyproducts`,{productid:item._id,user:auth?.user},{headers:{authorization:auth?.token}})
           if (res.data.success === "true") {
             toast.success("Order placed successfully")
           } else if(res.data.success === "false"){
             toast.error(res.data.messege)
           }
         } catch (error) {
           console.log(error)
         }
       }
       else{
         return;
       }
      
     }
     else{
      navigate('/login')
     }
  }

  useEffect(() => {

    const ws = new WebSocket('ws://localhost:1267')

    ws.onmessage = function incoming(event){
      const change = JSON.parse(event.data)
      
      if (change.operationType === 'update') {
      
        const updatedFields = change.updateDescription.updatedFields;
        const productId = change.documentKey._id;
    
        setProducts((prevProducts) => {
      
          const updatedProductIndex = prevProducts.findIndex((product) => product._id === productId);
    
          if (updatedProductIndex !== -1) {
     
            prevProducts[updatedProductIndex] = {
              ...prevProducts[updatedProductIndex],
              ...updatedFields,
            };
            return [...prevProducts];
          } else {
          
            console.warn('Product with _id not found:', productId);
            return prevProducts;
          }
        });
      } else {
        console.log('Received an invalid change:', change);
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/product/getallproducts`
        );
        
        if (response.data.success === "false") {
          
        } else {
          setProducts(response.data.allproducts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    
    return ()=>{
      ws.close();
    }

  },[]);


  return (
    <Layout>
      
      <div className="d-flex flex-wrap text-center border">
      {products.map((item, index) => (
        <div key={index}>

          <div className="card m-3" style={{ width: "16.95rem", height: "auto" }}>
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
              className="card-img-top p-3 img"
              alt={item.name}
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title navbar-brand">{item.name}</h5>
              <p className="overflow" style={{ margin: "5px 0" }}>Description: {item.discription}</p>
              <p className="overflow" style={{ margin: "5px 0" }}>Quantity: {item.quantity}</p>
              <p className="overflow" style={{ margin: "5px 0" }}>price: ${item.price}</p>
              <div className='card'>
                <button className='btn' onClick={()=>handelbuy(item)}>Buy Product</button>
              </div>
            </div>
          </div>
        </div>
        
      ))}
    </div>

    </Layout>
  )
}

export default Homepage