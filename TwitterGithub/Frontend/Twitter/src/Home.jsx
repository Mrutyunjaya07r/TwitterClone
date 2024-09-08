import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [data,setData]=useState([])

  useEffect(()=>{
    showdata()
  },[])

  const likePost=async(id)=>{
    let result=await fetch("http://localhost:3000/like",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("twitter")
      },
      body:JSON.stringify({
        likeid:id
      })
    })
    result=await result.json();
    console.log(result)
  }
  const unlikePost=async(id)=>{
    let result=await fetch("http://localhost:3000/unlike",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("twitter")
      },
      body:JSON.stringify({
        likeid:id
      })
    })
    result=await result.json();
    console.log(result)
  }

  const showdata=async()=>{
    let result=await fetch("http://localhost:3000/showpost");
    result=await result.json();
    console.log(result)
    setData(result)
  }
  return (
    <div>
      <div style={{position:"fixed",top:"0px"}}>
      <h1>Home</h1>
      </div>
      <div className="container">
        {
          data.map((item)=>
            <div className="card">
          <div className="header">
            <img src="profile.jpeg" style={{height:"40px",width:"40px",borderRadius:"50%"}} alt="" className="pic" />
            <pre>
            <h2 style={{marginLeft:"8px"}}><Link to={`/userprofile/${item.postedBy._id}`}>{item.postedBy.fullname}</Link></h2>
            <h3 style={{marginLeft:"8px"}}>{item.postedBy.username}</h3>
            </pre>
          </div>
          <div className="content">
            <img src={item.photo} alt=""  className="conimg" />
          </div>
          <div className="footer" style={{padding:"5px"}}>
            <pre style={{marginLeft:"20px"}}>
              <p>{item.title}</p>
              <p>{item.like?item.like.length:"0"} likes</p>
              <button style={{marginRight:"10px"}} onClick={()=>{likePost(item._id)}}>Like</button>
              <button style={{marginRight:"10px",marginTop:"10px"}} onClick={()=>{unlikePost(item._id)}}>Unlike</button>
            </pre>
          </div>
        </div>
          )
        } 
      </div>
    </div>
  )
}

export default Home