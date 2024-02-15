const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to MongoDB');

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

app.get('/api/crew', async (req, res) => {
  try {
    const db = client.db('test');
    const data = await db.collection('crew').find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching crew data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const db = client.db('test');
    const data = await db.collection('tasks').find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching tasks data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const db = client.db('test');
    const data = await db.collection('items').find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching tasks data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/query', async (req, res) => {
  try {
    const db = client.db('test');

    const parts = req.body.query.split('.')
    const thirdPart = parts[2].trim();
    const queryFilter = thirdPart.match(/\(([^)]+)\)/);

    console.log(1111, queryFilter[1])
    console.log(22222, parts[1])
    const data = await db.collection(parts[1]).find(JSON.parse(queryFilter[1])).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching tasks data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
