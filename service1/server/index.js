const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const config = require('../config.js');
const axios = require('axios');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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
app.get('/api/qa/questions/:id', (req, res) => {
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
app.post('/api/qa/questions', (req, res) => {
  const question = {body: req.body.body, name:req.body.name, email:req.body.email}
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions' , req.body
    ,{
      headers: {
        Authorization: config.TOKEN,
      }
    }
  )
  .then((data) => {
    console.log(data.config.data)
    res.send(data.config.data);
  })
  .catch((error) => {
    res.send(error);
  });
});

//getting answers 
app.get('/api/qa/questions/:question_id/answers', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/47584/answers`,
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

//updating helpfulness for the questions
app.put('/api/qa/questions/:question_id/helpful/', (req, res) => {
  axios.put("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/" + req.params.question_id +"/helpful",{},
{
  headers: {
    Authorization: config.TOKEN,
  },
})
  .then((data) => {
    res.send(data.data);
  })
  .catch((error) => {
    res.send(error);
  });
});

//updating helpfulness for the answers
app.put('/api/qa/answers/:answer_id/helpful', (req, res) => {
console.log(req.params.answer_id)
  axios.put("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/answers/" + req.params.answer_id +"/helpful",{},
{
  headers: {
    Authorization: config.TOKEN,
  },
})
  .then((data) => {
    res.send(data.data);
  })
  .catch((error) => {
    res.send(error);
  });
});

app.put('/api/qa/answers/:answer_id/report', (req, res) => {
  axios({
    headers: {
      Authorization: config.TOKEN,
    },
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.answer_id}/report`,
    method: 'put',
  }).then((data) => {
    res.send(data);
  })
    .catch((error) => { res.send(error); });
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
