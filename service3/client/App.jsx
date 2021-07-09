import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios"

import StarRating from './StarRating.jsx';
import Progress from "./leftComponent/ProgressBars.jsx";
import Newest from "./SortingBy/Newest.jsx";
import Helpful from "./SortingBy/Helpful.jsx";
import Relevant from "./SortingBy/Relevant.jsx";
import Rating from "./leftComponent/Rating.jsx";
import Characteristics from "./leftComponent/Characteristics.jsx";
import PostReview from "./PostReview.jsx";







function App() {
    const [data, setData] = useState([]);
    const [characteristics, setCharacteristics] = useState([])
    const [product_id, setId] = useState(11005);
    const [rating, setRating] = useState(null)
    const [newest, setNew] = useState(false)
    const [helpful, setHelp] = useState(false)
    const [relevant, setRelevant] = useState(true)
    const [addReview, setAddReview] = useState(false)
    const [stars, setStar] = useState(null)
    const [ratingStars, setRatingStars] = useState(false)
    const [recommend, setRecommend] = useState(false)
    const [percentage, setPercentage] = useState(0)



    const [sort, setSort] = useState("relevent")

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }




    useEffect(
        () => {
            axios.get(`/api/reviews/${product_id}/${sort}`)
                .then(result => {
                    setData(result.data)
                })
                .catch(err =>
                    console.error(err))
            axios.get(`/reviews/meta/${product_id}`)
                .then(result => {
                    setCharacteristics(result.data)
                })
                .catch(err =>
                    console.error(err))
        }, []
    )

    const changeRender = (val) => {
        if (val === "newest") {
            setRelevant(false)
            setSort("newest")
            setNew(true)
            setHelp(false)
            setRatingStars(false)
            setAddReview(false)
        } else if (val === "helpful") {
            setSort("helpful")
            setRelevant(false)
            setNew(false)
            setHelp(true)
            setRatingStars(false)
            setAddReview(false)
        } else if (val === "relevent") {
            setSort("relevent")
            setRelevant(true)
            setNew(false)
            setHelp(false)
            setRatingStars(false)
            setAddReview(false)
        } else if (val === "stars") {
            setRelevant(false)
            setNew(false)
            setHelp(false)
            setRatingStars(true)
            setAddReview(false)
        } else if (val === "add review") {
            setRelevant(false)
            setNew(false)
            setHelp(false)
            setRatingStars(false)
            setAddReview(true)
        }
    }

    function recommended() {

        if (data.results && !recommend) {
            let result;
            setRecommend(true)
            const sum = data.results.length

            let count = 0
            data.results.map((review) => {
                if (review.recommend) count++
            })
            if (count === 0) {
                setPercentage(0)
                return
            }
            result = ((count / sum) * 100).toFixed()
            setPercentage(result)
        }
    }
    recommended()

    const [sizeid, setSizeId] = useState(0)
    const [comfortid, setComforteId] = useState(0)
    const [widtheid, setWidtheId] = useState(0)
    const [qualityid, setQualityId] = useState(0)
    const [fitid, setFitId] = useState(0)
    const [lengthid, setLengthId] = useState(0)

    console.log(comfortid, "ahayyyaaaaaaaaaaaaaaaaaa")

    return (
        <>
            <h2 className="p-8  text-xl font-bold"> RATING & REVIEWS </h2>
            <div className="flex p-8 gap-2 h-auto">
                <section className="flex-initial p-2 "  >
                    {rating !== 0 && <div className="flex py-2">
                        <div className="text-4xl font-medium">{rating}</div>
                        <StarRating className="content-end" data={data.results} rating={rating} average={setRating} />
                    </div>}
                    <div className="py-2">{percentage}% of reviews recommend this product</div>
                    <Progress className="py-2" change={changeRender} stars={stars} setStar={setStar} data={data.results} />
                    <Characteristics className="gap-y-44 p-2" data={characteristics.characteristics}
                        size={setSizeId} comfort={setComforteId} width={setWidtheId} quality={setQualityId} fit={setFitId} length={setLengthId} />

                </section>
                <section className="flex-grow p-2 ">
                    <div className="flex font-medium text-2xl px-2">
                        <p className="font-medium text-2xl px-2">{data.results && data.results.length} reviews, sorted by</p>
                        <select onChange={(e) => changeRender(e.target.value)} className="gap-2 bg-opacity-0" >
                            <option value={"relevent"} className="gap-2 ">relavant reviews</option>
                            <option value={"newest"} className="gap-2">newest reviews</option>
                            <option value={"helpful"} className="gap-2">helpful reviews</option>
                        </select>
                    </div>
                    {relevant && <Relevant className="border-b-2" change={changeRender} data={data.results} open={openModal} modalOpen={modalIsOpen} modalClose={closeModal} />}
                    {newest && <Newest className="border-b-2" change={changeRender} data={data.results} />}
                    {helpful && <Helpful className="border-b-2" change={changeRender} data={data.results} />}
                    {ratingStars && <Rating className="border-b-2" stars={stars} data={data.results} />}
                    {addReview && <PostReview size={sizeid} comfort={comfortid} width={widtheid} quality={qualityid} fit={fitid} length={lengthid}
                        open={openModal} modalOpen={modalIsOpen} modalClose={closeModal} change={changeRender} product_id={product_id} />}

                </section>
            </div>
        </>
    )
}

export default App;