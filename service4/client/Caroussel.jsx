import React, { useEffect, useState } from 'react';
import './caroussel.css';

const Carousel = (props) => {

    const {children, show} = props;

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    const [touchPosition, setTouchPosition] = useState(null)

    
    //set the length to mach current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])
    
    const next = () => {
        if (currentIndex < (length - 4)) {
            setCurrentIndex(prevState => prevState + 4)
        }
    }

    const prev = () => {
        if(currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 4)
        }
    }

    

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }
    

    const handleTouchMove = (e) => {
        const touchDown = touchPosition
        if(touchDown === null) {
            return
        }
        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }
        setTouchPosition(null)
    }

    

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex > 0 &&
                    <button onClick={prev} className="left-arrow">
                        &lt;
                    </button>
                    
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className="carousel-content flex show-4"
                        style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
                    >
                        {children}
                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex < (length - 4) &&
                    <button onClick={next} className='right-arrow'>
                        &gt;
                    </button>
                    
                }
            </div>
        </div>
    )
}

export default Carousel


