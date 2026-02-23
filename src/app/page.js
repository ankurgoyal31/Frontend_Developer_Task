"use client"
import React from 'react'
 import { useEffect,useState } from 'react'
 import { Dashboard } from './server/handle_data'
import { user_task_delete } from './server/handle_data'
import { user_task } from './server/handle_data'
import { get_user_data } from './server/handle_data'
import { update } from './server/handle_data'
import Navbar from '../../navbar/nav'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter()
  const [task,set_task] = useState("");
  const[all_task,set_all_task] = useState([]);
   const[index,set_index] = useState({index:null,id:null})
   const[show_update,set_show_update] = useState(false)
   const[show_button,set_button] = useState(true)
const [loader,set_loader] = useState(false)
const [error,set_error] = useState(null)
  async function Get_data() {
  if(!user_email) return;
  set_loader(true);
  set_error(null);

  try {
    let data = await get_user_data(user_email);

    if(!data?.data || data.data.length === 0){
      set_error("No Task Found");
      set_all_task([]);
     } else {
      set_all_task(data.data);
    }
  } catch(err){
    set_error("Something went wrong");
  }

  set_loader(false);
 
  }
  const[user_email,set_user_email] = useState(null)
    useEffect(() => {
      let check_token = localStorage.getItem("user_token")
      if(!check_token){
        set_button(false)
         return
      }
        new Promise((resolve, reject) => {
        let data = Dashboard(localStorage.getItem("user_token")) 
         resolve(data)} ).then((data)=>{set_user_email(data.email)}).catch((e)=>
        {return "something went wrong"});
            }, [])
useEffect(() => {
  if(!user_email) return
  Get_data();
}, [ user_email])

     const create = async ()=>{
      if(task===""){
        alert("please the require field....")
        return
      }

    alert("sucessfully create your task");
     let data =  await user_task(task,user_email);
     Get_data();
     set_task("")
     }
    function user_update() {
 let upadated = [...all_task]
 upadated[index.index].task = task;
 set_all_task(upadated)
update(index.id,task);
set_show_update(false)
set_task("")
     }
     const edit = (id,edit_task,index_value)=>{
      set_task(edit_task)
     set_index({index:index_value,id:id});
     set_show_update(true)
      }  
      const task_delete=(id)=>{
      user_task_delete(id)
      Get_data();
      }
    return (
            <>
  <Navbar />

  <div className="container">
    <div className="card">
      <h1 className="title">Create Your Task</h1>

      <div className="input_section">
        <input
          className="input_field"
          value={task}
          type="text"
          onChange={(e) => set_task(e.target.value)}
          placeholder="Enter your task..."
        />
        {!show_button && <> <Link href={"/login"}><button className= "primary_btn">Login To Craete</button></Link></>   }
        {!show_update && show_button && (
          <button className="primary_btn" onClick={create}>
            Create
          </button>
        )}
          {show_update && (
          <button className="update_btn" onClick={user_update}>
            Update
          </button>
        )}
      </div>
    </div>
 {loader &&<h2>Loading...</h2>}
  {error && <h2>{error}</h2>}
     <div className="task_list">
      {all_task &&
        all_task.map((item, i) => (
          <div key={item._id} className="task_card">
            <div className="task_text">{item.task}</div>

            <div className="task_actions">
       <button
            className="delete_btn"
                onClick={() => task_delete(item._id)}
              >
                Delete
              </button>

              <button
                className="edit_btn"
                onClick={() => edit(item._id, item.task, i)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
    </div>
  </div>
</>
   )
}
export default page
