"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import Navbar from '../../../navbar/nav'
import { useRouter } from 'next/navigation'
import { register } from '../server/handle_data'
const page = () => {
  const router = useRouter();
  const [first, setfirst] = useState({name:"",email:'',password:''});
  const submit = async()=>{
 let sucess = await register(first.email,first.name,first.password);
 if(sucess?.sucess){
  router.push("/login")
}
  }
  return (

     <>
     <Navbar/>
     
  <div className="register_wrapper">
    <div className="register_card">
      <h2 className="register_title">Create Account</h2>
      <p className="register_sub">Register to get started</p>

      <div className="input_group">
        <input
          type="text"
          name="name"
          value={first.name}
          onChange={(e) =>
            setfirst({ ...first, [e.target.name]: e.target.value })
          }
          placeholder="Enter your name"
        />
      </div>

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

      <button className="register_btn" onClick={submit}>
        Register
      </button>
    </div>
  </div>
</>


  )
}

export default page