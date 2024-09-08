import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Profile() {
    let [data,setData]=useState([])
    let [_id,set_Id]=useState("")
    useEffect(()=>{
        showProfile()
    },[])

    

    const removePost=async()=>{
        let result=await fetch("http://localhost:3000/delete",{
            method:"delete",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                _id:_id
            })
        })
        result=await result.json()
        console.log(result)
        alert("deleted successfully")
    }

    const showProfile=async()=>{
        let result=await fetch("http://localhost:3000/mypost",{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("twitter")
            }
        });
        result=await result.json()
        console.log(result)
        setData(result)
    }
  return (
    <div>
        <div className="contain" style={{marginLeft:"20px",height:"100vh",overflow:"auto"}}>
        {
            data.map((item)=>
                <div className="main">
        <div className="head" style={{display:"flex",margin:"10px"}}>
    <img src="profile.jpeg" style={{height:"140px",width:"140px",borderRadius:"50%"}} alt="" className="profile" />
    <pre style={{margin:"30px"}}>
    <h1>{item.postedBy.fullname}</h1>
    <h2>{item.postedBy.username}</h2>
    <ul style={{display:"flex"}}>
        <li style={{margin:"5px"}}>0 Posts</li>
        <li style={{margin:"5px"}}>0 followers</li>
        <li style={{margin:"5px"}}>0 following</li>
    </ul>
    </pre>

        <hr />
        <div className="posts" style={{margin:"30px"}}>
            <img src={item.photo} style={{height:"200px",width:"200px",borderRadius:"10px"}} alt="" className="postimgs" />
            <div className="postdetail">
                <p>Post id:{item._id}</p>
                <p>Title:{item.title}</p>
                <input type="text" name="delete" id="delete" value={_id} placeholder='Enter the above post Id to Delete post' onChange={(e)=>{set_Id(e.target.value)}} />
                <input type="submit" value="Delete" onClick={()=>{removePost()}} style={{backgroundColor:"red",color:"black",border:'0.5px solid black'}} />
                <button style={{backgroundColor:"chartreuse",color:"black",width:"250px",marginTop:"20px",height:"40px"}}><Link style={{color:"black"}} to={'/update/'+item._id}>Update</Link></button>
            </div>
        </div>
        </div>
        </div>
            )
        }
        </div>
       
    </div>
  )
}

export default Profile

