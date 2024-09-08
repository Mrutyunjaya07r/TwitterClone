let express=require('express');
let cors=require('cors');
let app=express();
app.use(express.json());
app.use(cors())
let mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1/twitterdatabase")
.then(()=>{console.log("connect to mongodb")})
.catch((err)=>{console.log("Not connected",err)})
require('./models/model')
require('./models/post')

app.use(require('./Router/routes'))

app.get("/",(req,res)=>{
    res.send("Hello")
})

let port=process.env.PORT||3000;
app.listen(port,()=>{console.log(`App is running at ${port}`)})