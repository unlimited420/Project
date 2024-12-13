import express from 'express';
import { MongoClient } from 'mongodb';

const connectionURL = 'mongodb://localhost:27017/'; 

const client = new MongoClient(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();


app.use(express.static('./public'));


app.get('/data', async (req, res) => {
  try {
    const database = client.db('project'); 
    const collection = database.collection('your_collection_name'); 

    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from MongoDB');
  }
});

client.connect()
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    
    // Start Express server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  });
