import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToDatabase() {
  if (!client.topology) {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return client.db("easy-learn-dev");
}
