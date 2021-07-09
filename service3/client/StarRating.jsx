import StarRatings from "react-star-ratings";
import React, { useState } from "react";


function StarRating(props) {

    console.log("rating here ", props.rating)
    console.log(props.data, "data")

    const averageStar = () => {
        if (props.data && !props.rating) {
            let sum = 0
            let i = 0
            props.data.forEach(element => {
                sum += element.rating
                i++
            })
            if (sum === 0) {
                props.average(0)
                return
            }
            let average = sum / i;
            props.average(average)
        }
    }

    averageStar()


    return (props.rating && <StarRatings
        count={5}
        rating={props.rating}
        size={32}
        isHalf={true}
        emptyIcon={<i i className="far fa-star" ></i >}
        halfIcon={<i i className="fa fa-star-half-alt" ></i >}
        fullIcon={<i i className="fa fa-star" ></i >}
        starRatedColor="#ffd700"
        starDimension="15px"
        starSpacing="2px"
    />)

}

export default StarRating


