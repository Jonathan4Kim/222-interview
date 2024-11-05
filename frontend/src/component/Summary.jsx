import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './styles.css';

const TraitsCarousel = ({traits}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Check if traits is available and has items
    if (!traits || traits.length === 0) {
        return <div>No traits available</div>;
    }

    const move = (index) => {
        setCurrentIndex(index);
    };
    return (<>
    <div className='carousel-container'>
        <p>Only <strong>{traits[currentIndex].percentage}%</strong> of</p>
        <p>222 members chose</p>
        <p><strong>{traits[currentIndex].is_scale ? `${traits[currentIndex].answer} / ${traits[currentIndex].max_val}` : traits[currentIndex].answer}</strong></p>
        <p>when asked about</p>
        <p><strong>{traits[currentIndex].question}</strong></p>
        <div className='carousel-button-container'>
            {traits.map((traits, index) => (
                <button className='index-button' onClick={() => move(index)}></button>
            ))}
        </div>

    </div>
    </>)
}

const ImagesCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return <div>No images available</div>;
    }

    const getRandomImages = (images) => {
        const shuffled = [...images].sort(() => Math.random() - 0.5); 
        return shuffled.slice(0, 9); 
    };

    const selectedImages = getRandomImages(images); 

    const next = () => {
        currentIndex === selectedImages.length - 1
            ? setCurrentIndex(0)
            : setCurrentIndex(currentIndex + 1);
    };

    const prev = () => {
        currentIndex === 0
            ? setCurrentIndex(selectedImages.length - 1)
            : setCurrentIndex(currentIndex - 1);
    };

    const move = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
            <div className='carousel-container'>
                <img
                    src={selectedImages[currentIndex]}
                    width={400}
                    height={400}
                    alt="carousel"
                />
                <div className='carousel-button-container'>
                    {selectedImages.map((image, index) => (
                        <button
                            className={`index-button ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => move(index)}
                            key={index}
                        ></button>
                    ))}
                </div>
            </div>
        </>
    );
};



export default function Summary() {
    const {first, last} = useParams();
    const [data, setData] = useState('');
    const [traits, setTraits] = useState([]); // Can be dynamic from user input
    const [images, setImages] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/data/${first}/${last}`);
          const data_backend = await response.data;
          setData(data_backend);
          setTraits([data_backend['trait_1'], data_backend.trait_2, data_backend.trait_3, data_backend.trait_4, data_backend.trait_5]);
        } catch (error) {
          console.error("error fetching data: ", error);
        }
      }

      const fetchImages = async () => {
        try {
            const response = await axios.get('/api/image_urls');
            const data_backend = await response.data
            setImages(data_backend)
        } catch (error) {
            console.error("error fetching data ", error)
        }
      }

      fetchData();
      fetchImages();
    }, []);


    return (
        <>
        <div className='overall_container'>
            <h1>{data.name}</h1>
            <div className='photos'>
                <ImagesCarousel images={images}></ImagesCarousel>
            </div>
            <div className="summary">
                <p>You are the <strong>{data.type}</strong></p>
                <p>You share this in common with <strong>{data.percentage}%</strong> of other 222 members</p>
                <p>Learn more about each character type <strong>here</strong></p>
            </div>
            <div>
                
            </div>
            <TraitsCarousel traits={traits}></TraitsCarousel>
        </div>
        </>
    );
}