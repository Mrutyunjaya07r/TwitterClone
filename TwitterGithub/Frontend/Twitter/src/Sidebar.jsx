import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Sidebar() {
  let navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem("twitter");
    navigate('/signin')
  }
  return (
    <div>
        <nav>
            <ul>
            <img src="blog.png" alt="" className='logo' />
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/createpost'>Create Post</Link></li>
                <li><Link to='/search'>Search</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
                <li><Link to='/signin'>Signin</Link></li>
                <button onClick={()=>{logout()}} className='logout'>Logout</button>
            </ul>
        </nav>
    </div>
  )
}

export default Sidebar