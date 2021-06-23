import { useState } from 'react';
import IMAGES from "../../Assets/images.json";
import {IoIosArrowBack} from "react-icons/io"
import {IoIosArrowForward} from "react-icons/io"
import './slidercarrousel.scss'


const SliderCarousel = ({ imageList = IMAGES }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const imageListLength = imageList.length;

  function handlePreviousImage() {
    setCurrentImage(currentImage === 0 ? imageListLength - 1 : currentImage - 1);
  }

  function handleNextImage() {
    setCurrentImage(currentImage === imageListLength - 1 ? 0 : currentImage + 1);
  }

  return (
    <div >
      {
        imageListLength > 0 ?
          imageListLength !== 1 ?
            <div className = 'Carrousel_SliderCarrousel'>
              <div className = 'Icon_SliderCarrousel'>
                <IoIosArrowBack onClick={handlePreviousImage} size = '3em' cursor = 'pointer'/>
              </div>
              {
                imageList.map((image, index) => {
                  if (index === currentImage) {
                    return (
                      <div>
                        <img
                          width="200px"
                          key={image.id_image}
                          src={image.name_image}
                          alt="not found"
                        />
                      </div>
                    );
                  }
                  else return "";
                })
              }
              <div className = 'Icon_SliderCarrousel'>
                <IoIosArrowForward onClick={handleNextImage}  size="3em" cursor = 'pointer'/>
              </div>
            </div> :
            <div>
              <img
                width="200px"
                key={imageList[0].id_image}
                src={imageList[0].name_image}
                alt={imageList[0].name_image}
              />
            </div> :
          <div>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'
              alt='Image not available'
              width="200px"
            />
          </div>
      }
    </div>
  );
};

export default SliderCarousel;