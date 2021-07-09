import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars-2';



const Newest = (props) => {

    const [addReview, setAddReview] = useState(2)
    const [helpful, setHelp] = useState(null)
    const [show, setShow] = useState(true)

    const sort = (array) => {
        return array.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        })
    };

    function addRender() {
        setAddReview(addReview + 2)
    }
    console.log("newest ", props.data)

    const update = (review) => {
        console.log(review.review_id, "hheheheheheheheh")
        let help = review.helpfulness
        axios.put(`/api/reviews/${review.review_id}/helpful`, { help: help++ })
            .then(result => {
                console.log("front", result.data)
            })
            .catch(err =>
                console.error(err))
    }

    // className = "overflow-auto h-36"
    return (
        <>
            <Scrollbars autoHeight autoWidth autoHeightMin={300} autoHeightMax={400} >
                {props.data && sort(props.data).map((review) => {
                    if (helpful === null) {
                        setHelp(review.helpfulness)
                    }
                    if (props.data.indexOf(review) >= addReview) { return }
                    return (<div key={props.data.indexOf(review)} className="border-b-2 p-4">
                        <div className="flex justify-between p-2">
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
                                <div className="px-2">{review.reviewer_name} </div>
                                <div >{review.date.slice(0, 10)} </div>
                            </div>
                        </div>
                        <div className="font-medium p-2">{review.summary} </div>
                        <div className="p-2">{review.body} </div>
                        {review.response && <div className="rounded bg-gray-200 p-2">
                            <p>Response: </p>
                            <div> {review.response} </div>
                        </div>}
                        <div className="flex gap-2 text-xs p-2">
                            <div className="font-medium "> helpful ?</div>
                            <div className="font-normal text-gray-500 " > ({review.helpfulness}) </div>
                            <div onClick={() => {
                                console.log("test")
                                update(review)
                                setHelp(review.helpfulness += 1)
                            }}>Yes |</div>
                            <a>Report</a>
                        </div>

                    </div>)
                })}
            </Scrollbars>
            <div className="flex">
                <button className="p-2 border-b-2 hover:bg-gray-200 font-medium" onClick={addRender}> MORE REVIEWS</button>
                <button className="p-2 border-b-2 hover:bg-gray-200 font-medium" onClick={() => props.change("add review")}> ADD A REVIEW </button>
            </div>
        </>)
}

export default Newest;