const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 9000

const app = express()
const corsOptions = {
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// verify jwt token
const verifyToken = (req,res,next)=>{
  const token = req.cookies?.token
  if(!token) return res.status(401).send({message: "unathorized access"})
  if(token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
      if(err){
        return res.status(401).send({message: "unathorized access"})
      }
      console.log(decoded)
      req.user = decoded
      next()
    })
  }
  console.log(token)


}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wubkqtt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
      const jobsCollection = client.db('postBid').collection('jobs')
      const bidscollection = client.db('postBid').collection('bids')

    // =======================================JWT============================================//
    // --------------------------------------------------------------------------------------//
    //   JWT Generate
    // --------------------------------------------------------------------------------------/
      app.post('/jwt', async(req,res)=>{
        const email = req.body
        const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '365d'})
        res.cookie('token',token,{
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
        }).send({success: true})
      })
    // --------------------------------------------------------------------------------------//
    //   Clear token
    // --------------------------------------------------------------------------------------/
      app.get('/logout', (req,res)=>{
        res.clearCookie('token',{
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
          maxAge: 0
        }).send({success: true})
      })




    // ========================================API===========================================//
    // --------------------------------------------------------------------------------------//
    //   Get data from DB(Already dummy data in db and we want to get them through a request)
    // --------------------------------------------------------------------------------------//
        app.get('/jobs', async(req,res)=>{
            const result = await jobsCollection.find().toArray() //to get data use find() and when we use find we have to use toArray()
            res.send(result)
        })

    // --------------------------------------------------------------------------------------//
    //   Get a single job data using job id
    // --------------------------------------------------------------------------------------//
        app.get('/job/:id', async(req,res)=>{
          const id = req.params.id
          console.log(id)
          const query = { _id: new ObjectId(id)}
          console.log(query)
          const result = await jobsCollection.findOne(query)
          console.log(result)
          res.send(result)
        })
    // --------------------------------------------------------------------------------------//
    //   Save a single bid data in db
    // --------------------------------------------------------------------------------------//
        app.post('/bid', async(req,res)=>{
          const bidData = req.body
          // check if it is dublicate request
          const query = {
            email: bidData.email,
            jobId: bidData.jobId
          }
          const alreadyApplied = await bidscollection.findOne(query)
          if(alreadyApplied){
            return res.status(400).send("Already applied")
          }
          const result = await bidscollection.insertOne(bidData)
          res.send(result)
        })
    // --------------------------------------------------------------------------------------//
    //   Save a single job data in db
    // --------------------------------------------------------------------------------------//
    app.post('/job', async(req,res)=>{
      const jobData = req.body
      const result = await jobsCollection.insertOne(jobData)
      res.send(result)
    })
    // --------------------------------------------------------------------------------------//
    //   Get all posted data by a single user
    // --------------------------------------------------------------------------------------//
    app.get('/jobs/:email',verifyToken, async(req,res)=>{
      const tokenEmail = req.user.email
      console.log(tokenEmail, 'from-token')
      const email = req.params.email
      if(tokenEmail !== email) return res.status(403).send({message: "forbidden access"})
      const query = {'buyer.email': email}
      const result = await jobsCollection.find(query).toArray()
      res.send(result)
    })
    // --------------------------------------------------------------------------------------//
    //   Delete a single job from db
    // --------------------------------------------------------------------------------------//
    app.delete('/job/:id', async(req,res)=>{
      const id = req.params.id
      const query = { _id: new ObjectId(id)}
      const result = await jobsCollection.deleteOne(query)
      res.send(result)
    })
    // --------------------------------------------------------------------------------------//
    //   Update a single job from db
    // --------------------------------------------------------------------------------------//
    app.put('/job/:id', verifyToken, async(req,res)=>{
      const id = req.params.id
      const jobData = req.body
      const query = { _id: new ObjectId(id)}
      const options = { upsert: true }
      const updateDoc = {
        $set:{
          ...jobData,
        }
      } 
      const result = await jobsCollection.updateOne(query,updateDoc,options)
      res.send(result)
    })
    // --------------------------------------------------------------------------------------//
    //   Get all bids data by a single user through email from db
    // --------------------------------------------------------------------------------------//
    app.get('/my-bids/:email', verifyToken,async(req,res)=>{
      const email = req.params.email
      const query = {email}
      const result = await bidscollection.find(query).toArray()
      res.send(result)
    })
    // --------------------------------------------------------------------------------------//
    //   Get all bids request data for job owner by email from db
    // --------------------------------------------------------------------------------------//
    app.get('/bid-requests/:email', verifyToken,async(req,res)=>{
      const email = req.params.email
      const query = {'buyer.email': email}
      const result = await bidscollection.find(query).toArray()
      res.send(result)
    })
    // --------------------------------------------------------------------------------------//
    //   Update bid status with patch
    // --------------------------------------------------------------------------------------//
    app.patch('/bid/:id', async(req,res)=>{
      const id = req.params.id
      const status = req.body
      const query = {_id: new ObjectId(id)}
      const updateDoc = {
        $set: status
      }
      const result = await bidscollection.updateOne(query,updateDoc)
      res.send(result)
    })








      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error

    }
  }
  run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send("Hello from postBid server")
})

app.listen(port, ()=>console.log(`server running on port ${port}`))