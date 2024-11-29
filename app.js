import express from 'express';
import { MongoClient } from 'mongodb';

const connectionURL = 'your_mongo_connection_url'; // Replace with your MongoDB connection URL

const client = new MongoClient(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Middleware to serve static files from 'public' directory
app.use(express.static('./public'));

// Define a route to fetch data from MongoDB
app.get('/data', async (req, res) => {
  try {
    const database = client.db('your_database_name'); // Replace with your database name
    const collection = database.collection('your_collection_name'); // Replace with your collection name

    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from MongoDB');
  }
});

// Connect to MongoDB and Start Server
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
    process.exit(1); // Exit process if MongoDB connection fails
  });
