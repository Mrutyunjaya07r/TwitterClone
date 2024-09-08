import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

function Userprofile() {
    let {userid}=useParams()
    let [user,setUser]=useState("")
    let [post,setPost]=useState([])
    useEffect(()=>{
        showProfile()
    },[userid])

    const showProfile=async()=>{
        let result=await fetch(`http://localhost:3000/userprofile/${userid}`,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("twitter")
            }
        });
        result=await result.json()
        console.log(result)
        setUser(result.user)
        setPost(result.post)
    }
    const follow=async(userId)=>{
        let result=await fetch("http://localhost:3000/follow",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("twitter")
            },
            body:JSON.stringify({
                followId:userId
            })
        })
        result=await result.json()
        console.log(result)
    }
    const unfollow=async(userId)=>{
        let result=await fetch("http://localhost:3000/unfollow",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("twitter")
            },
            body:JSON.stringify({
                followId:userId
            })
        })
        result=await result.json()
        console.log(result)
    }
  return (
    <div>
         <div>
        <div className="contain" style={{marginLeft:"20px",height:"100vh",overflow:"auto"}}>
        {
            post.map((item)=>
                <div className="main">
        <div className="head" style={{display:"flex",margin:"10px"}}>
    <img src="profile.jpeg" style={{height:"140px",width:"140px",borderRadius:"50%"}} alt="" className="profile" />
    <pre style={{margin:"30px"}}>
    <h1>{item.postedBy.fullname}</h1>
    <h2>{item.postedBy.username}</h2>
    <ul>
        <li>{post.length} posts</li>
        <li>{user.followers?user.followers.length:"0"} followers</li>
        <li>{user.following?user.following.length:"0"} following</li>
    </ul>
    <button onClick={()=>{follow(item.postedBy._id)}}>Follow</button>
    <button onClick={()=>{unfollow(item.postedBy._id)}}>UnFollow</button>
    </pre>

        <hr />
        <div className="posts" style={{margin:"30px"}}>
            <img src={item.photo} style={{height:"200px",width:"200px",borderRadius:"10px"}} alt="" className="postimgs" />
        </div>
        </div>
        </div>
            )
        }
        </div>
       
    </div>
    </div>
  )
}

export default Userprofile