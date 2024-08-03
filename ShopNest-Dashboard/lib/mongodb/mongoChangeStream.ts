import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('ShopNest');
    // Start the change stream on the database
    const changeStream = database.watch();
    changeStream.on('change', (change) => {
      console.log('Change detected:', change);
      // Handle the change event here, e.g., send data to the client using SSE
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo();

export default client;
