import "./index.css";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";

function Stars(props) {
  const [stars, setStars] = useState(1);
  const [product_id, setId] = useState(11001);
  const urlApi = "https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc";

  useEffect(() => {
    axios.get(`/api/overview/reviews/${props.id}`).then((data) => {
      setStars(data.data).catch((err) => {
        console.log(err, "failed to get data");
      });
    });
  }, []);

  return (
    <div className="flex gap-4">
      {" "}
      <StarRatings rating={stars} starDimension="20px" starSpacing="4px" />{" "}
      <h5 className="hover:underline">read all reviews</h5>
    </div>
  );
}

export default Stars;
