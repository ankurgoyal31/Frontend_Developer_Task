"use client"
import React from 'react'
import { useState } from 'react'
import { login } from '../server/handle_data'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
 const page = () => {
    const router = useRouter();
  const [first, setfirst] = useState({email:'',password:''});
  const[error,set_error] = useState(false)
  const submit = async(e)=>{
     if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(first.email)){
alert("please enter valid email id");
return
     }
if(first.name==""||first.email==""||first.password==""){
      alert("please fill the require field....")
      return
    }
 let data = await login(first.email,first.password);
 if(data?.sucess){
localStorage.setItem("user_token",data?.token)
router.push("/");
}else{
   set_error(true)
 }
   }
  return (
      <>
   <div className="login_wrapper">
    <div className="login_card">
        {error && <><div>you have not registerd</div><div><Link className='register_btn_style' href={"/registration"}>register now</Link></div></>}

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
          required
        />
      </div>
       <button   className="login_btn" onClick={submit}>
        Login
      </button>
       </div>
   </div>
 </>
) 
}
export default page
