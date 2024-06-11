const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');
const cors= require('cors');

const app = express();

app.use(cors());
const port = 4001;

app.use(bodyParser.json());

const client = new Client({ node: 'http://localhost:9200' });

app.get('/', (req, res) => {
  res.send('Elasticsearch with Node.js and React.js');
});

// Index a document
app.post('/index', async (req, res) => {
  const { index, id, body } = req.body;
  try {
    const response = await client.index({
      index,
      id,
      body,
    });
    
    res.status(200).send(response);
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

// Search documents
app.get('/search', async (req, res) => {
  const { index, query } = req.query;
  try {
    const { body } = await client.search({
      index,
      body: {
        query: {
          match: { message: query },
        },
      },
    });
    res.status(200).send(body.hits.hits);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Add more routes for indexing and searching

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
