"use client"
import React from 'react'
import { useState } from 'react'
import { login } from '../server/handle_data'
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter();
  const [first, setfirst] = useState({email:'',password:''});
  const submit = async()=>{
 let data = await login(first.email,first.password);
 if(data?.sucess){
localStorage.setItem("user_token",data?.token)
router.push("/");
}
   }
  return (

      <>
  <div className="login_wrapper">
    <div className="login_card">
      <h2 className="login_title">Welcome Back</h2>
      <p className="login_sub">Login to continue</p>

      <div className="input_group">
        <input
          type="email"
          name="email"
          value={first.email}
          onChange={(e) =>
            setfirst({ ...first, [e.target.name]: e.target.value })
          }
          placeholder="Enter your email"
        />
      </div>
      <div className="input_group">
        <input
          type="password"
          name="password"
          value={first.password}
          onChange={(e) =>
            setfirst({ ...first, [e.target.name]: e.target.value })
          }
          placeholder="Enter your password"
        />
      </div>

      <button className="login_btn" onClick={submit}>
        Login
      </button>
    </div>
  </div>
</>
) 
}
export default page
