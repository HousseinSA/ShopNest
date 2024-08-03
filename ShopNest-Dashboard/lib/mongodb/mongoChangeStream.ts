import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || '';
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('yourDatabaseName');
    const collection = database.collection('yourCollectionName');

    // Start the change stream
    const changeStream = collection.watch();

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
