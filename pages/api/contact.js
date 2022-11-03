import { MongoClient } from 'mongodb';
const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.bnjhcks.mongodb.net/?retryWrites=true&w=majority`;

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email,
      name,
      message
    };

    let client;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db('my-site');
    const collection = db.collection('messages');

    try {
      const result = await collection.insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: 'Storing message failed' });
    } finally {
      client.close();
    }

    res.status(201).json({
      message: 'Successfully stored message!',
      message: newMessage
    });
  }
}

export default handler;
