import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Images = (props) => {
  const [images, setImages] = useState([]);
  const [main, setMain] = useState("");
  let [index, setIndex] = useState(0);
  let [selectQ, setSelectedQ] = useState(1);
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [style, setStyle] = useState("");
  const [slogan, setSlogan] = useState("");
  let [styleIndex, setStyleIndex] = useState(index);
  const [quantity, setQuantity] = useState(4);
  let [skus, setSkus] = useState(0);

  // console.log(size);

  useEffect(() => {
    axios
      .get(`/api/overview/products/${props.id}`)
      .then((response) => {
        setCategory(response.data.category);
        setName(response.data.name);
        setPrice(response.data.default_price);
        setStyle(response.data.style);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`/api/overview/products/${props.id}/styles`).then((response) => {
      // console.log(response.data);
      setMain(response.data[index].main);
      setImages(response.data);
      setSize(response.data[index].skus);
      // console.log(response.data[index].skus);
    });
  }, []);

  const handleClick = (e) => {
    setMain(e);
    images.forEach((image) => {
      if (image.main === main) {
        setIndex(images.indexOf(image));
      }
    });
    setSize(images[index].skus);
  };

  const changeQuantity = (e) => {
    setSelectedQ(e.target.value);
    console.log(e.target.value);
  };

  const changeSize = (e) => {
    setStyleIndex(e);
    setSize(images[index].skus);
    // console.log(e.target.value);
    // Object.values(size).forEach((skus, index) => {
    //   if (e.target.value === skus.size) {
    //     setQuantity(skus.quantity);
    //     console.log(skus);
    //   }
    // });
    console.log(Object.entries(size)[e.target.value][0]);
    setQuantity(Object.entries(size)[e.target.value][1].quantity);
    setSkus(Object.entries(size)[e.target.value][0]);
  };

  const addToBag = () => {
    axios
      .post(`/api/overview/cart`, {
        sku_id: skus,
        count: quantity,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    console.log("added bitch ");
  };

  const left = () => {
    images.forEach((image) => {
      if (image.main === main) {
        setIndex(images.indexOf(image));
      }
    });
    if (index > 0) {
      setIndex(index--);
      setMain(images[index].main);
    }
    // console.log(images[index]);
    // console.log(images);
  };

  const right = () => {
    images.forEach((image) => {
      if (image.main === main) {
        setIndex(images.indexOf(image));
      }
    });
    if (index < images.length - 1) {
      setIndex(index++);
      setMain(images[index].main);
    }
    setSize(images[index].skus);
    // console.log(Object.entries(size)[0][1].quantity);
  };

  return (
    <>
      <div className=" flex gap-4 h-full ">
        <div className="space-y-4 space-x-6">
          <ul className="space-y-4 space-x-4">
            {images.map((product) => {
              return (
                <li className="h-18 w-18 " key={product.id}>
                  <img
                    src={product.thumbnail}
                    onClick={() => handleClick(product.main)}
                    className="relative z-10 inline object-cover w-16 h-16 border-2 hover:border-black rounded-full"
                  />
                </li>
              );
            })}
          </ul>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="grey"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 space-y-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="grey"
          onClick={left}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <div className="w-96">
          {images.length && <img className= /**" mx-auto max-h-160 "**/ " w-full   object-fill  rounded-2xl" src={main} />}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="grey"
          onClick={right}
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="grey"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </div>

      <div>
        <h3>{category}</h3>
        <h2>{name}</h2>
        {images.length && (
          // {{images[index].salePrice} ? <h3>images{[index].salePrice}</h3> : <h3>{images[index].price}}
          // <h2>{images[index].salePrice || images[index].price} $</h2>
          <>{images[index].salePrice ? <h3 className="text-red-600">{images[index].salePrice}</h3> : <h3>{images[index].price} </h3>}</>
        )}
        {images.length && (
          <h3 className="flex">selected style: {images[index].name} </h3>
        )}
        <ul className=" flex flex-wrap space-y-4 space-x-4">
          {images.map((product) => {
            return (
              <li className="h-18 w-18 " key={product.id}>
                <img
                  src={product.thumbnail}
                  onClick={() => handleClick(product.main)}
                  className="relative z-10 inline object-cover w-16 h-16 border-2 hover:border-black rounded-full"
                />
              </li>
            );
          })}
        </ul>
        <div className="gap-y-6 gap-x-6">
          {Object.entries(size).length && (
            <select
              className="gap-6 z-10 mt-1 w-16 bg-white shadow-lg h-8 max-h-16 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              value={quantity}
              onChange={changeSize}
            >
              {Object.entries(size).map((taille, i) => {
                return (
                  <option
                    // onClick={() => changeSize}
                    key={taille[0]}
                    // value={taille[1].size.value}
                    value={i}
                  >
                    {taille[1].size}
                  </option>
                );
              })}
            </select>
          )}
          {quantity && (
            <select
              className="absolute z-10 mt-1 w-16 bg-white shadow-lg h-8 max-h-16 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow focus:outline-none sm:text-sm"
              value={quantity}
              onChange={changeQuantity}
            >
              {[...Array(quantity)].map((q, i) => {
                return (
                  <option className=" bg-gray-100 text-gray-600" key={i}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        {/* <h3 className="border border-indigo-600 w-36">
          {" "}
          ADD TO BAG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={addToBag}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </h3> */}
        <button
          onClick={addToBag}
          className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 "
        >
          <span>Add Cart</span>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 border-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    </>
  );
};

export default Images;
