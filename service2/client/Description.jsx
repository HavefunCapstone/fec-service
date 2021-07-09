// import "./index.css";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Description(props) {
//   const [category, setCategory] = useState("shoes");
//   const [name, setName] = useState("airs");
//   const [price, setPrice] = useState("150");
//   const [style, setStyle] = useState("no clue man not a fashion guy");
//   const [slogan, setSlogan] = useState("wear it ");

//   useEffect(() => {
//     axios
//       .get(`/products/${props.id}`)
//       .then((response) => {
//         setCategory(response.data.category);
//         setName(response.data.name);
//         setPrice(response.data.default_price);
//         setStyle(response.data.style);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   return (
//     <>
//       <h3>{category}</h3>
//       <h2>{name}</h2>
//       <h2>{price} $</h2>
//       <h1>{slogan}</h1>
//       <h4>style: selected style</h4>
//     </>
//   );
// }
