const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const config = require('../config.js');
const TOKEN = require('../config').TOKEN;
const axios = require('axios');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

//get products from the API 
app.get('/products/:id', (req, res) => {
  axios({
    headers: {
      Authorization: config.TOKEN,
    },
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products',
    params: {
      product_id: req.params.id,
    },
    method: 'get',
    responseType: 'text',
  })
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
});

// getting questions from the API
app.get('/questions/:id', (req, res) => {
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions?product_id=" +
  req.params.id,
{
  headers: {
    Authorization: config.TOKEN,
  },
})
  .then((data) => {
    res.send(data.data);
  })
  .catch((error) => {
    console.log('error case:');
    res.send(error);
  });
});

// posting question
app.post('qa/questions', (req, res) => {
  const question = {body: req.body.body, name:req.body.name, email:req.body.email}
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions' , req.body
    ,{
      headers: {
        Authorization: config.TOKEN,
      }
    }
  )
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
