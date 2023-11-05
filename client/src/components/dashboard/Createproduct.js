import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Createproduct = () => {
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [discription,setDiscription] = useState("")
    const [quantity,setQuantity] = useState("")
    const [price,setPrice] = useState("")
    const [photo,setphoto] = useState()
    const [auth] = useAuth()
    
    const handelSubmit= async(e)=>{
        e.preventDefault();

        try{
            const productsellerid = auth?.user?.sellerid

            const productData = new FormData()
            productData.append("name",name)
            productData.append("discription",discription)
            productData.append("price",price)
            productData.append("quantity",quantity)
            productData.append("photo",photo)
            productData.append("productsellerid",productsellerid)

            const {data} =await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,
            productData,{
                headers:{
                    "authorization" : auth?.token
                }
            })
            if (data.success==="true") {
                navigate("/dashboard")
              }
              else if(data.success === "false"){
                toast.error(data.messege);
              }
        }
        catch(error){
            console.log(error)
        }
    }



  return (
      <div className="registerationform1">
        <h1 className="">Create Product</h1>
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              placeholder="enter product name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="enter product discription"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter product quantity"
              required
            />
            </div>
            <div className="mb-3">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter product price"
              required
            />
            </div>
            <div className='mb-3 upload'>
                <label className='btn btn-outline-secondary upload-photo-btn'>
                    <span className='photo-name'>{photo? photo.name : "upload photo"}</span>
                    <input type="file" name='photo' accept='image/*' required onChange={(e)=>setphoto(e.target.files[0])} hidden/>
                </label>
            </div>

            {/* <div className='mb-3'>
                {photo && (<div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'} className="img img-responsive"/>
                </div>)}
            </div> */}
            
          <button type="submit" className="form-btn btn btn-primary">
            Create
          </button>
        </form>
      </div>
  )
}

export default Createproduct