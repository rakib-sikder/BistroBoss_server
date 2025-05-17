const express = require("express");
const app =express()
const cors= require("cors")
require("dotenv").config()
const port = process.env.PORT || 5000


//middleware

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fp9zu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

    const foodMenuCollection= client.db("Bistro_DB").collection("resturent_menu")
    const resturentReviewCollection= client.db("Bistro_DB").collection("resturent_reviews")

    app.get("/menu",async(req,res)=>{
        const result= await foodMenuCollection.find().toArray()
        res.send(result);
    })
    
    app.get("/reviews",async(req, res)=> {
        const result = await resturentReviewCollection.find().toArray()
        res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);



app.get("/", (req, res)=>{
   res.send("server boss is ready") 
})

app.listen(port,()=>{
    console.log(`my port is ${port}`)
})