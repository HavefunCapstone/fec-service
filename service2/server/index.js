const axios= require("axios");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = process.env.PORT || 3002;
require("dotenv").config();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//fetching the average of reviews

app.get("/api/overview/reviews/:product_id", (req, res) => {
  axios
    .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/`, {
      headers: {
        Authorization: process.env.API_KEY,
      },
      params: {
        product_id: req.params.product_id,
      },
    })
    .then((result) => {
      // console.log("oooo weeee", result.data);
      let ratesData = result.data.results;
      let avreageRating = ratesData.reduce((acc, obj) => {
        return acc + obj.rating;
      }, 0);
      res.status(200).json(avreageRating / ratesData.length);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

//fetching product details

app.get("/api/overview/products/:product_id", (req, res) => {
  axios
    .get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.product_id}`,
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
      }
    )
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//fetching product images and thumbnails

app.get(`/api/overview/products/:product_id/styles/`, (req, res) => {
  axios
    .get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.product_id}/styles`,
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
      }
    )
    .then((result) => {
      let info = result.data.results.map((item) => {
        return {
          thumbnail: item.photos[0].thumbnail_url,
          main: item.photos[0].url,
          id: item.style_id,
          name: item.name,
          price: item.original_price,
          salePrice: item.sale_price,

          skus: item.skus,
        };
      });
      res.status(200).send(info);
    })
    .catch((err) => console.log(err));
});

//posting to the cart

app.post(`/api/overview/cart`, (req, res) => {
  console.log(req.body);
  axios
    .post(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/cart/`,
      req.body,
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
      }
    )
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
