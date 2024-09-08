import React, { useState } from 'react'
import {useParams} from 'react-router-dom'

function Update() {
    const params=useParams()
    const [title,setTitle]=useState("");

    const updatePost=async(req,res)=>{
        let result=await fetch(`http://localhost:3000/update/${params.id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:title
            })
        })
        result=await result.json();
        console.log(result);
        alert("update sucessfully")
    }

  return (
    <div>
        <h1>Update Post</h1>
        <div className="con">
            <div className="formin">
                <input type="text" name="title" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                <input type="submit" value="Update" style={{backgroundColor:"chartreuse",color:"black",border:"0.5px solid black"}} onClick={()=>{updatePost()}} />
            </div>
        </div>
    </div>
  )
}

export default Update