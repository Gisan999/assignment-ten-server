const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const express = require("express")
const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.csnq8lx.mongodb.net/?retryWrites=true&w=majority`;


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

        const productCollection = client.db('productsDB').collection('products');
        const brandCollection = client.db('brandDB').collection('brand');
        const cartCollection = client.db('cartDB').collection('cart'); 


        app.post('/cart', async(req, res)=> {
            const addCart = req.body;
            const result = await cartCollection.insertOne(addCart);
            res.send(result);

        })


        app.get('/cart', async (req, res)=> {
            const cursor = cartCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })


      app.delete('/cart/:id', async (req, res)=> {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await cartCollection.deleteOne(query);
        res.send(result);
      })


        app.post('/brand', async (req, res)=> {
            const newBrand = req.body;
            const result = await brandCollection.insertOne(newBrand);
            res.send(result);
        })



        app.get('/brand', async (req, res)=> {
            const cursor = brandCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })
   



        app.get('/brand/:id', async (req, res)=> {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await brandCollection.findOne(query);
            res.send(result);
        })


        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })

        app.get('/product', async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productCollection.findOne(query);
            res.send(result);
        })

        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateProduct = req.body;
            const products = {
                $set: {
                    image: updateProduct.image,
                    name: updateProduct.name, 
                    brandName: updateProduct.brandName,
                     type: updateProduct.type,
                    price: updateProduct.price,
                     shortDescription: updateProduct.shortDescription,
                    rating: updateProduct.rating
                }
            }
            const result = await productCollection.updateOne(filter, products, options);
            res.send(result)

        })


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