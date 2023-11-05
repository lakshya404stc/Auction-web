import React,{useState,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Layout from "./Layout/Layout";


const Spinner = ({path = "login"}) => {

  const [count,setCount] = useState(5)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount((prevValue)=> --prevValue)
    },1000)
    count===0 && navigate(`/${path}`,{
      state:location.pathname
    })

    return ()=> clearInterval(interval)

  },[count,navigate,location])

  return (
    <Layout>
    <div className="d-flex flex-column align-items-center justify-content-center" style={{height:"80vh"}}>
      <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
      </div>
      <h4 className="pnf-heading pt-5 ">login required </h4>
      <h4 className="pnf-heading">redirecting in... {count}</h4>
    </div>
    </Layout>
  );
};

export default Spinner;
