import { useState, useEffect } from 'react';
import IMAGES from "../../Assets/images.json";
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"
import './slidercarrousel.scss'


const SliderCarousel = ({ imageList = IMAGES, isBanner = false }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [clickedButton, setClickedButton] = useState(true);

  const imageListLength = imageList.length;

  useEffect(() => {
    if (imageListLength) {
      if (clickedButton) {
        setTimeout(() => setCurrentImage(currentImage === imageListLength - 1 ? 0 : currentImage + 1), 2500);
      }
      // if (isBanner) {
      // }
      // for (let i = 0; i < imageListLength; i++) {
      //   continue;
      // }
    }
  }, [imageList, imageListLength, isBanner, clickedButton, currentImage]);


  function handlePreviousImage() {
    setCurrentImage(currentImage === 0 ? imageListLength - 1 : currentImage - 1);
  }

  function handleNextImage() {
    setCurrentImage(currentImage === imageListLength - 1 ? 0 : currentImage + 1);
  }

  function handleImageButtons(e) {
    setCurrentImage(e.target.name - 1);
  }

  function pauseAutoScroll() {
    setClickedButton(false);
  }
  function playAutoScroll() {
    setClickedButton(true);
  }

  return (
    <div>
      {
        imageListLength > 0 ?
          imageListLength !== 1 ?
            <div className={isBanner ? "carruosel_container banner_container" : "carruosel_container"}>
              <div
                className={
                  isBanner ?
                    "Carrousel_SliderCarrousel banner_carrousel_display" :
                    "Carrousel_SliderCarrousel cropped_container"
                }
                onMouseOver={pauseAutoScroll}
                onMouseLeave={playAutoScroll}
              >
                <div
                  className={
                    isBanner ?
                      "Icon_SliderCarrousel_left banner_Icon_SliderCarrousel_left" :
                      "Icon_SliderCarrousel_left"
                  }
                >
                  <IoIosArrowBack onClick={handlePreviousImage} className="icon_left" />
                </div>
                {
                  imageList.map((image, index) => {
                    if (index === currentImage) {
                      return (
                        <div className="image_container">
                          <img
                            className={isBanner ? "banner_image" : "cropped_image"}
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
                <div
                  className={
                    isBanner ?
                      "Icon_SliderCarrousel_right banner_Icon_SliderCarrousel_right" :
                      "Icon_SliderCarrousel_right"
                  }
                >
                  <IoIosArrowForward onClick={handleNextImage} className="icon_right" />
                </div>
              </div>
              {
                isBanner ?
                  <div className="slider_dot_buttons_container">
                    {
                      imageList.map((image) => {
                        return (
                          <div className="dot_button_container">
                            <button
                              name={image.id_image}
                              onClick={handleImageButtons}
                              className={image.id_image - 1 === currentImage ? "dot_button active" : "dot_button"}
                            ></button>
                          </div>
                        );
                      })
                    }
                  </div> : ""
              }
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