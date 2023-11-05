import React from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login1 = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate();
  const location = useLocation()
  
  // form submission function
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (res.data.success === "true") {
        setAuth({...auth,
            user: res.data.user,
            token: res.data.token,
            }
          )

        localStorage.setItem("auth",JSON.stringify(res.data))
        navigate(location.state||"/");
        
      }
      else if(res.data.success === "false" ){
        toast.error(res.data.messege,{
          duration:2000,
        })
        navigate("/login") 
         
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="registration form">
      <div className="registerationform">
        <h1>Login page</h1>
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter your password"
              required
            />
          </div>

          <Link className="navlink" to="/forgetpassword">Forgot Password?</Link>

          <button type="submit" className="form-btn btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login1;
