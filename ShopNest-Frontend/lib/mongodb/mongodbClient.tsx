import { MongoClient } from 'mongodb'

const uri = process.env.DATABASE_URL as string
const client = new MongoClient(uri)
let clientPromise: Promise<MongoClient> | null = null

if (!clientPromise) {
  clientPromise = client.connect()
}

export default clientPromise
