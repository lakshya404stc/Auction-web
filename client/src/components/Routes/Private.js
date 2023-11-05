import { useEffect,useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute(){

    const [auth] = useAuth()
    const [ok,setOk] = useState(false)

    useEffect(()=>{

        const authCheck = async()=>{
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
                    {
                        headers:{
                            "authorization" : auth?.token
                        }
                    })

                    if(res.data.ok){
                        setOk(true)
                    }
                    else{
                        setOk(false)
                    }
            } catch (error) {
                console.log(error)
            }
        }
        
        if(auth?.token) authCheck() 

    },[auth?.token])

    return ok ? <Outlet/> : <Spinner/>
}