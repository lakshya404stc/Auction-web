import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate();

  // form submission function
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, answer }
      );

      if (res.data.success==="true") {
        navigate("/login");
      }
      else if(res.data.success === "false"){
        toast.error(res.data.messege,{
          duration:1000,
        });
        navigate("/register")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="registration form">
      <div className="registerationform">
        <h1 className="my-35">Registration page</h1>
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              placeholder="enter your name"
              required
            />
          </div>
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
          <div className="mb-3">
            <p>who is your favourite person?</p>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputanswer"
              aria-describedby="emailHelp"
              placeholder="Security Question?"
              required
            />
          </div>
          <button type="submit" className="form-btn btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
