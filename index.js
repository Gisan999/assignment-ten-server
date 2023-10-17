const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const express = require("express")
const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json());

// ruheatheking3
// Ny7fzyNdTMVV5zUh

const port = process.env.PORT || 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.csnq8lx.mongodb.net/?retryWrites=true&w=majority`;

// const uri = "mongodb+srv://ruheatheking3:Ny7fzyNdTMVV5zUh@cluster0.csnq8lx.mongodb.net/?retryWrites=true&w=majority";


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
      
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get("/", (req, res) => {
    res.send("server is running...")
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})