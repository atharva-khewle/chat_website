const express = require('express')
const app = express()


app.get("/api",(req,res)=>{
    res.json({"users":["mongo","bongo"]})
})


app.listen(7000,()=>{console.log("server on runming...")})