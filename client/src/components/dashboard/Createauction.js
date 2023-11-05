import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Createauction = () => {
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [discription,setDiscription] = useState("")
    const [photo,setphoto] = useState()
    const [hours,setHours] = useState()
    const [minutes,setMinutes] = useState()
    const [seconds,setSeconds] = useState()
    const [auth] = useAuth()
    
    const handelSubmit= async(e)=>{
        e.preventDefault();
        
        try{
            const auctionsellerid = auth?.user?.auctionsellerid

            const productData = new FormData()
            productData.append("name",name)
            productData.append("discription",discription)
            productData.append("photo",photo)
            productData.append("productauctionsellerid",auctionsellerid)
            productData.append("timerh",hours)
            productData.append("timerm",minutes)
            productData.append("timers",seconds)

            const {data} =await axios.post(`${process.env.REACT_APP_API}/api/v1/auction/create-auction`,
            productData,{
                headers:{
                    "authorization" : auth?.token
                }
            })
            if (data.success==="true") {
                navigate("/dashboard/auctions")
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
        <h1 className="">Create Product For Auction</h1>
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
          <ul className="d-flex justify-content-center align-items-center m-0 p-0" style={{listStyleType:'none'}}>
            <li><h4>Timer -  </h4></li>
            <li>
            <div >
            <input
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Hr"
              style={{width:'50px'}}
              required
            />
          </div>
            </li>
            <li>
            <div>
            <input
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Min"
              style={{width:'50px'}}
              required
            />
          </div>
            </li>
            <li>
            <div>
            <input
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Sec"
              style={{width:'50px'}}
              required
            />
          </div>
            </li>
          </ul>
          </div>
            <div className='mb-3 upload'>
                <label className='btn btn-outline-secondary upload-photo-btn'>
                    <span className='photo-name'>{photo? photo.name : "upload photo"}</span>
                    <input type="file" name='photo' accept='image/*' required onChange={(e)=>setphoto(e.target.files[0])} hidden/>
                </label>
            </div>

          <button type="submit" className="form-btn btn btn-primary">
            Create
          </button>
        </form>
      </div>
  )
}

export default Createauction