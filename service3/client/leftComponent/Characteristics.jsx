import React, { useEffect, useState } from "react";

import { Slider, Typography } from '@material-ui/core';

const Characteristics = (props) => {

    const [render, setRender] = useState(false)
    const [comfort, setComfort] = useState(0)
    const [fit, setFit] = useState(0)
    const [length, setLength] = useState(0)
    const [quality, setQuality] = useState(0)



    console.log(props.comfort, "hehehehehehehehheheheheh")

    const initChar = () => {
        if (props.data && !render) {
            setRender(true)
            if (props.data.Comfort) {
                setComfort(props.data.Comfort.value.slice(0, 1))
                props.comfort(props.data.Comfort.id)
                console.log(props.data.Comfort.id, "beeeeeeeeeeeeeeeee33333333333")
            }
            if (props.data.Width) {
                props.width(props.data.Width.id)
                // missing here
            }
            if (props.data.Size) {
                props.size(props.data.Size.id)
                // here also

            }
            if (props.data.Fit !== undefined) {
                setFit(+props.data.Fit.value.slice(0, 1))
                props.fit(props.data.Fit.id)
            }
            if (props.data.Length) {
                setLength(+props.data.Length.value.slice(0, 1))
                props.length(props.data.Length.id)
            }
            if (props.data.Quality) {
                setQuality(+props.data.Quality.value.slice(0, 1))
                props.quality(props.data.Quality.id)
            }
        }
    }

    initChar()

    console.log(props.data, "charararararrara")

    const exist = (val) => {
        if (val !== 0) {
            return true
        }
        return false
    }

    return (
        <div className="p-2">

            {exist(fit) && <div div className="py-6">
                <div className="font-bold">Fit</div>
                <Slider
                    value={fit}
                    max={5}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="auto"
                />
                <div className="flex justify-between text-xs">
                    <div>Too small</div>
                    <div>Perfect</div>
                    <div>Too large</div>
                </div>
            </div>}


            {
                exist(comfort) && <div className="py-4">
                    <div className="font-bold">Comfort</div>
                    <Slider
                        value={comfort}
                        max={5}
                        aria-labelledby="discrete-slider-always"
                        valueLabelDisplay="auto"
                    />
                    <div className="flex justify-between text-xs">
                        <div>Poor</div>
                        <div>Perfect</div>
                    </div>
                </div>
            }

            {
                exist(quality) && <div className="py-4">
                    <div className="font-bold">Quality</div>
                    <Slider
                        value={quality}
                        max={5}
                        aria-labelledby="discrete-slider-always"
                        valueLabelDisplay="auto"
                    />
                    <div className="flex justify-between text-xs">
                        <div>Too small</div>
                        <div>Perfect</div>
                        <div>Too large</div>
                    </div>
                </div>
            }

            {
                exist(length) && <div className="py-4">
                    <div className="font-bold">Length</div>
                    <Slider
                        value={length}
                        max={5}
                        aria-labelledby="discrete-slider-always"
                        valueLabelDisplay="auto"
                    />
                    <div className="flex justify-between text-xs">
                        <div>Poor</div>
                        <div>Perfect</div>
                    </div>
                </div>
            }

        </div >
    )

}

export default Characteristics;