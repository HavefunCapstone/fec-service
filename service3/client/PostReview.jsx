import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Modal from 'react-modal';
import { Slider, Typography } from '@material-ui/core';
import axios from "axios";
import Swal from 'sweetalert2'

const PostReview = (props) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    let subtitle;

    const [renderOne, setRenderOne] = useState(true)
    const [renderTwo, setRenderTwo] = useState(false)
    const [summary, setSummary] = useState(null)
    const [body, setBody] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState(null)
    const [mail, setMail] = useState(null)
    const [recommend, setRecommend] = useState(null)


    const [chSize, setCS] = useState("Set your rating")
    const [chWidt, setCW] = useState("Set your rating")
    const [chComfort, setCC] = useState("Set your rating")
    const [chQuality, setCQ] = useState("Set your rating")
    const [chLength, setCL] = useState("Set your rating")
    const [chFit, setCF] = useState("Set your rating")

    console.log("summary", summary)
    console.log("body", body)
    console.log("photo", photo)
    console.log("name", name)
    console.log("mail", mail)
    console.log("recommend", recommend)

    const [rating, setRating] = useState(0)
    function changeRating(newRating, name) {
        setRating(newRating)
    }
    console.log("rating", rating)

    const [size, setSize] = useState(0)
    const handleSize = (event, newValue) => {
        setSize(newValue)
        if (newValue === 1) {
            setCS("A size too small")
        } else if (newValue === 2) {
            setCS("½ a size too small")
        } else if (newValue === 3) {
            setCS("Perfect")
        } else if (newValue === 4) {
            setCS("½ a size too big")
        } else if (newValue === 5) {
            setCS("A size too wide")
        }
    }

    const [width, setWidth] = useState(0)
    const handlewidth = (event, newValue) => {
        setWidth(newValue)
        if (newValue === 1) {
            setCW("Too narrow")
        } else if (newValue === 2) {
            setCW("Slightly narrow")
        } else if (newValue === 3) {
            setCW("Perfect")
        } else if (newValue === 4) {
            setCW("Slightly wide")
        } else if (newValue === 5) {
            setCW("Too wide")
        }
    }

    const [comfort, setComfort] = useState(0)
    const handleComfort = (event, newValue) => {
        setComfort(newValue)
        if (newValue === 1) {
            setCC("Uncomfortable")
        } else if (newValue === 2) {
            setCC("Slightly uncomfortable")
        } else if (newValue === 3) {
            setCC("Ok")
        } else if (newValue === 4) {
            setCC("Comfortable")
        } else if (newValue === 5) {
            setCC("Perfect")
        }
    }

    const [quality, setQuality] = useState(0)
    const handleQuality = (event, newValue) => {
        setQuality(newValue)
        if (newValue === 1) {
            setCQ("Poor")
        } else if (newValue === 2) {
            setCQ("Below average")
        } else if (newValue === 3) {
            setCQ("What I expected")
        } else if (newValue === 4) {
            setCQ("Pretty great")
        } else if (newValue === 5) {
            setCQ("Perfect")
        }
    }

    const [length, setLength] = useState(0)
    const handleLength = (event, newValue) => {
        setLength(newValue)
        if (newValue === 1) {
            setCL("Runs Short")
        } else if (newValue === 2) {
            setCL("Runs slightly short")
        } else if (newValue === 3) {
            setCL("Perfect")
        } else if (newValue === 4) {
            setCL("Runs slightly long")
        } else if (newValue === 5) {
            setCL("Runs long")
        }
    }

    const [fit, setFit] = useState(0)
    const handleFit = (event, newValue) => {
        setFit(newValue)
        if (newValue === 1) {
            setCF("Runs Short")
        } else if (newValue === 2) {
            setCF("Runs slightly short")
        } else if (newValue === 3) {
            setCF("Perfect")
        } else if (newValue === 4) {
            setCF("Runs slightly long")
        } else if (newValue === 5) {
            setCF("Runs long")
        }
    }


    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    function afterOpenModal1() {
        subtitle.style.color = '#f00';
    }
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    console.log(props.comfort, "uyufyufévyfuvifyuvfvyf")
    function submit() {
        let object = {
            product_id: props.product_id,
            rating: rating,
            summary: summary,
            body: body,
            recommend: true,
            name: name,
            email: "mail@gmail.com",
            photos: photo,
            size: props.size + "",
            quality: props.quality + "",
            width: props.width + "",
            comfort: props.comfort + "",
            characteristics: {
                size: size,
                quality: quality,
                width: width,
                comfort: comfort
            }
        }
        axios.post(`/api/reviews`, object)
            .then(result => {
                console.log(result)
                Swal.fire(
                    'You post is created!',
                    'success'
                )
            })
            .catch(err =>
                console.error(err))
    }


    return (
        <div>
            {renderOne && <Modal
                isOpen={renderOne}
                onAfterOpen={afterOpenModal}
                onRequestClose={props.modalClose}
                style={customStyles}
                contentLabel="Example Modal">
                <p className="text-4xl font-medium p-4">POST YOUR REVIEW HERE</p>
                <p>Overall rating</p>
                <StarRatings className="p-2"
                    rating={rating}
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                    starRatedColor="#ffd700"
                    starDimension="25px"
                    starSpacing="40px"
                />

                <div className="flex justify-between">
                    <p className="p-1">Poor</p>
                    <p className="p-2">Fair</p>
                    <p className="p-2">Average</p>
                    <p className="p-2">Good</p>
                    <p className="p-2">Great</p>
                </div>

                <p >Do you recommend this product?   </p>

                <div className="flex">
                    <div className="p-4">
                        <input type="radio" value={true} name="name" onChange={e => setRecommend(e.target.value)} />
                        <label>Yes</label>
                    </div>
                    <div className="p-4">
                        <input type="radio" value={false} name="name" onChange={e => setRecommend(e.target.value)} />
                        <label>No</label>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p>Size</p>
                    <p>{chSize}</p>
                </div>
                <Slider
                    defaultValue={0}
                    value={size}
                    onChange={handleSize}
                    max={5}
                    min={0}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="auto"
                />
                <div className="flex justify-between">
                    <p>Width</p>
                    <p>{chWidt}</p>
                </div>
                <Slider
                    defaultValue={0}
                    value={width}
                    onChange={handlewidth}
                    max={5}
                    min={0}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="auto"
                />
                <div className="flex justify-between">
                    <p>Comfort</p>
                    <p>{chComfort}</p>
                </div>
                <Slider
                    defaultValue={0}
                    value={comfort}
                    onChange={handleComfort}
                    max={5}
                    min={0}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="auto"
                />
                <div className="flex justify-between">
                    <p>Quality</p>
                    <p>{chQuality}</p>
                </div>
                <Slider
                    defaultValue={0}
                    value={quality}
                    onChange={handleQuality}
                    max={5}
                    min={0}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="auto"
                />
                <div className="flex justify-between">
                    <p>Length</p>
                    <p>{chLength}</p>
                </div>
                <Slider
                    defaultValue={0}
                    value={length}
                    onChange={handleLength}
                    max={5}
                    min={0}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="auto"
                />
                <div className="flex justify-between">
                    <p>Fit</p>
                    <p>{chFit}</p>
                </div>
                <Slider
                    defaultValue={0}
                    value={fit}
                    onChange={handleFit}
                    max={5}
                    min={0}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="auto"
                />
                <div className="flex justify-end">
                    <button onClick={() => {
                        setRenderOne(false)
                        setRenderTwo(true)
                    }}>Next</button>
                </div>
            </Modal>}

            {renderTwo &&
                <Modal
                    isOpen={renderTwo}
                    onAfterOpen={afterOpenModal1}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">

                    <p>REVIEW SUMMARY</p>
                    <textarea placeholder="Type here" onChange={event => setSummary(event.target.value)}></textarea>
                    <p>REVIEW BODY</p>
                    <textarea placeholder="Type here" onChange={event => setBody(event.target.value)}></textarea>
                    <p>UPLOAD YOUR PHOTOS</p>
                    <textarea placeholder="Type here" onChange={event => setPhoto(event.target.value)}></textarea>
                    <p>WHAT IS YOUR NICKNAME</p>
                    <input placeholder="your nickname here" onChange={event => setName(event.target.value)} />
                    <p>WHAT IS YOUR E-mail</p>
                    <input placeholder="your email here" onChange={event => setMail(event.target.value)} />

                    <div className="flex justify-between">
                        <button onClick={() => {
                            setRenderOne(true)
                            setRenderTwo(false)
                        }}>Previous</button>
                        <button onClick={() => {
                            submit()
                            props.change("relevent")
                        }}>Submit</button>
                        <button onClick={() => {
                            props.modalClose()
                            props.change("relevent")
                        }}>close</button>

                    </div>
                </Modal>}
        </div>
    );
}

export default PostReview;