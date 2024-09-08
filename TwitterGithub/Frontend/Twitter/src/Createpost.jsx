import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Createpost() {
  let navigate=useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("http://localhost:3000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("twitter")
        },
        body: JSON.stringify({
          title: title,
          pic: url
        })
      })
      .then((res) => res.json())
      .then((data) => { console.log(data);})
      .catch((err) => { console.log(err); });
    }
  }, [url]);

  const postDetail = () => {
      let imgdata = new FormData();
      console.log(image)
      imgdata.append("file", image);
      imgdata.append("upload_preset", "Twitter");
      imgdata.append("cloud_name", "mrutyunjayacloud");

     fetch("https://api.cloudinary.com/v1_1/mrutyunjayacloud/image/upload", {
        method: "post",
        body: imgdata
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        setUrl(data.url);
        
      })
    
    }
  const loadFile = (event) => {
    const output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src); // free memory
    };
  };


  return (
    <div style={{textAlign:"center",marginLeft:"20px"}}>
      <h1>Create Posts</h1>
      <img id="output" style={{ height: "300px", width: "300px" }} />
      <br />
      <input type="file" name="photo" id="photo" accept="image/*" onChange={(event) => { loadFile(event); setImage(event.target.files[0]); }} />
      <h1>Enter The Title</h1>
      <input type="text" name="title" id="title" value={title} onChange={(e) => { setTitle(e.target.value); }} placeholder='Enter Title' />
      <input type="submit" value="Share" onClick={postDetail} style={{marginLeft:"20px",backgroundColor:"chartreuse",color:"black",border:"0.5px solid black"}} />
    </div>
  );
}

export default Createpost;
