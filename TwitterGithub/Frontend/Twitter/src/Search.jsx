import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

function Search() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        showUser();
    }, []);

    const showUser = async () => {
        try {
            let result = await fetch("http://localhost:3000/showuser");
            result = await result.json();
            console.log(result);
            setUser(result);
        } catch (err) {
            console.log(err);
        }
    };

    const showSearch = async (event) => {
        let key = event.target.value;
        try {
            let result = await fetch(`http://localhost:3000/search/${key}`);
            result = await result.json();
            console.log(result);
            setUser(result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Search For User</h1>
            <div className="conti" style={{textAlign:"center",margin:"50px",marginLeft:"100px",overflow:"auto"}}>
            <input type="text" name="search" onChange={showSearch} id="search" placeholder='Enter User' />
            {
                user.map((item) =>
                    <div className="cont" key={item.id}>
                        <div className="user" style={{display:"flex",marginTop:"8px"}}>
                            <img src="profile.jpeg" style={{ height: "30px",marginLeft:"10px", width: "30px",borderRadius:"50%" }} alt="" />
                            <pre>
                            <h2 style={{marginLeft:"10px"}}><Link to={`/userprofile/${item._id}`}>{item.fullname}</Link></h2>
                            <h3>{item.username}</h3> 
                            </pre>
                        </div>
                        <hr />
                    </div>
                )
            }
        </div>
            </div>
           
    );
}

export default Search;
