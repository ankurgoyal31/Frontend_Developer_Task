"use server"
import { MongoClient } from "mongodb"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
let client = null;

async function connection_check(params) {
    if(client) return client;
    client  = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    return client
}
async function connect() {
    const client = await connection_check();
    const db =await client.db("register_user");
    return {new_user:db.collection("All_user_data"),user_task:db.collection("user_task")};
}
export const register = async(email,name,password)=>{
    try{
  let {new_user} =await connect(); 
    let check =await new_user.findOne({email});
    if(check){
        return "all ready exist";
    }
    let hide_password = await bcrypt.hash(password, 10);
     await new_user.insertOne({email,name,hide_password,password});
    return {sucess:true}
    }catch{
    return {sucess:false}
   }
 }

export const login =async (email,password)=>{
    try{
let {new_user} = await connect();
let check_user = await new_user.findOne({email});
if(!check_user ){
return "401,not found.."
}
 
const isMatch = await bcrypt.compare(password,check_user.hide_password);
if(!isMatch){
     return{sucess:false}
}
let genrate_token = jwt.sign({userId:check_user._id,email: check_user.email,},process.env.JWT_SECRET,{ expiresIn: "24h" })
return {sucess:true,token:genrate_token,name:check_user.name,email:check_user.email}
    }catch(err){
         return {sucess:false}
    }
 }

export  const Dashboard = async(token)=> {
if(!token){
    return "empty"
}
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     return {sucess:true,email:decoded.email};

  } catch (err) {
     return "please login or register"
  }
  return <h1>Dashboard</h1>;
}
export  const user_task = async(task,email)=>{
let {user_task} = await connect();
try{
     await user_task.insertOne({task,email});
    return {sucess:true}
}catch(err){
    return {sucess:false}
}
}

export const get_user_data=async(email)=>{
let {user_task} = await connect();
try{
let find_users =await user_task.find({email}).toArray();
if(!find_users.length){
     return {sucess:false,data:[]}
 }
 return {data:find_users};
}catch(err){
return {sucess:false,error:err,data: []}
}
}
export const update = async(id,task)=>{
    try{
 let {user_task} = await connect();
await user_task.updateOne({_id:new ObjectId(id)},{$set:{task}})
return {sucess:true}
    }catch(err){
        return {sucess:false}
 }
}

export const user_task_delete = async(id)=>{
try{
let {user_task} = await connect();
await user_task.deleteOne({_id:new ObjectId(id)});
return{sucess:true}
}catch(err){
return{sucess:false}
}
}