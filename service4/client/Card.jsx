import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import Modal from "./Modal.jsx";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };
  }

  render() {
    return (
      <div className=''>
        {this.props.isButton ? (
          <div
            onClick={() => {
              this.props.addProductToOutFit();
            }}
            style={{
              display: 'flex',
              margin: "5px",
              border: "1px solid #ccc",
              float: "left",
              minWidth: "180px",
              minHeight: "350px",
              position: "relative",
            }}
          >
            <svg
              style={{
                left: "0",
                right: "50%",
                top: "50%",
                position: "absolute",
                textAlign: "center",
                transform: "translateY(-50%)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ) : (
          
          <div className='flex flex-col '
            onClick={() => {
              this.setState({ modal: !this.state.modal });
            }}
            style={{
              margin: "5px",
              border: "1px solid #ccc",
              float: "left",
              width: "180px",
              height: "300px",

              position: "relative",
            }}
          >
            {!this.props.haveClose && (
              <svg
                style={{ right: 0, position: "absolute" }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            )}

            {this.props.haveClose && (
              <svg
                onClick={() =>
                  this.props.deleteProductFromOutFIT(this.props.product.id)
                }
                style={{ right: 0, position: "absolute" }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}

            <img
              style={{
                maxHeight: "150px",
                maxWidth: "180px",
                width: "100%",
                height: "100%",
              }}
              className="w 500 "
              src={this.props.product.img}
              alt="Mountain"
            />


            <div className="flex-auto justify-evenly">
              <div className=" text-l mb-2 ">{this.props.product.category}</div>

              <div className="text-gray-700 text-xs font-bold ">
                {/* {this.props.product.name + " - " + this.props.product.slogan} */}
                {this.props.product.name}

              </div>

              <br></br>
              {/* <div class="text-xl text-black font-semibold mt-1">$240.00</div> */}
              <div className="text-xl text-black font-semibold mt-1">
                {this.props.product.sale_price === null ? (
                  <div className=" text-xs mb-2">
                    ${this.props.product.default_price}{" "}
                  </div>
                ) : (
                  <div>
                    <div className="text-xs mb-2 text-red-600">
                      ${this.props.product.sale_price}
                    </div>
                    <div className="line-through text-xs mb-2">
                      ${this.props.product.default_price}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:flex  py-4  text-sm text-gray-600 m-0">
                {this.props.product.rating !== 0 && (
                  <StarRatings
                    rating={this.props.product.rating}
                    starDimension="15px"
                    starSpacing="5px"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Card;
