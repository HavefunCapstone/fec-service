import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";



const Rating = (props) => {



    const filter = (array) => {
        return array.filter(function (el) {
            return el.rating === props.stars
        })

    }

    return (<div>
        {props.data && filter(props.data).map((review) => {
            return (<div key={props.data.indexOf(review)} className="border-b-2 p-4">
                <div className="flex justify-between">
                    <StarRatings
                        count={5}
                        rating={review.rating}
                        size={32}
                        isHalf={true}
                        emptyIcon={<i i className="far fa-star" ></i >}
                        halfIcon={<i i className="fa fa-star-half-alt" ></i >}
                        fullIcon={<i i className="fa fa-star" ></i >}
                        starRatedColor="#ffd700"
                        starDimension="15px"
                        starSpacing="2px"
                    />
                    <div className="flex justify-end">
                        <div>{review.reviewer_name} </div>
                        <p>||</p>
                        <div>{review.date.slice(0, 10)} </div>
                    </div>
                </div>
                <div className="font-medium">{review.summary} </div>
                <div>{review.body} </div>
                <div className="rounded bg-gray-200">
                    <p>Response: </p>
                    <div> {review.response} </div>
                </div>
                <div className="flex gap-2 text-xs">
                    <div className="font-medium "> helpful ?</div>
                    <a>Yes |</a> <a>Report</a>
                </div>

            </div>)
        })}
    </div>)
}

export default Rating;