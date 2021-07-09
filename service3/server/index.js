const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3003;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const axios = require('axios');


require('dotenv').config()

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));



app.get('/api/reviews/meta/:product_id', (req, res) => {
  let id = req.params.product_id
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta/`, {
    headers: {
      Authorization: process.env.GITHUB_API, // the auth token header
    },
    params: {
      product_id: id,
    }
  }).then(result => {
    console.log("charac here", result.data)
    res.status(200).json(result.data);
  }).catch(err => {
    console.log(err)
    res.status(500)
  })

});
// get request with sort 
app.get('/api/reviews/:product_id/:sort', (req, res) => {
  let id = req.params.product_id
  let sort = req.params.sort
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/`, {
    headers: {
      Authorization: process.env.GITHUB_API, // the auth token header
    },
    params: {
      product_id: id,
      sort: sort
    }
  }).then(result => {
    console.log("data here", result.data)
    res.status(200).json(result.data);
  }).catch(err => {
    console.log(err)
    res.status(500)
  })

});

app.post(`/api/reviews`, (req, res) => {
  let data = req.body

  console.log(data, "hehehehehehehhegfhfhch")
  let size = data.size;
  let quality = data.quality;
  let width = data.width;
  let comfort = data.comfort
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews`,
    {
      "product_id": data.product_id,
      "rating": data.rating,
      "summary": data.summary,
      "body": data.body,
      "recommend": data.recommend,
      "name": data.name,
      "email": data.email,
      "photos": [data.photos],
      "characteristics": {
        [size]: data.characteristics.size,
        [quality]: data.characteristics.quality,
        [width]: data.characteristics.width,
        [comfort]: data.characteristics.comfort
      }
    },
    {
      headers: {
        "content-type": "application/json",
        Authorization: process.env.GITHUB_API
      }
    }).then(result => {
      res.status(201).send("donnnnnnnnnnnnnnné");
    }).catch(err => {
      console.log(err)
      res.status(500)
    })
})

app.put(`/api/reviews/:review_id/helpful`, (req, res) => {
  let id = req.params.review_id
  console.log(id, "iddididididididiidi")
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/${id}/helpful`, {}, {
    headers: {
      Authorization: process.env.GITHUB_API
    }
  }).then(result => {
    res.status(201).send("donnnnnnnnnnnnnnné");
  }).catch(err => {
    console.log(err)
    res.status(500)
  })
})


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

