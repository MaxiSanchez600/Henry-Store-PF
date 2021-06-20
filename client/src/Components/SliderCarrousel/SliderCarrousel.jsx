import { useState } from 'react';
import IMAGES from "../../Assets/images.json";
import {IoIosArrowBack} from "react-icons/io"
import {IoIosArrowForward} from "react-icons/io"


const SliderCarousel = ({ imageList = IMAGES }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const imageListLength = imageList.length;

  function handlePreviousImage() {
    // console.log("imageList: ", imageList);
    setCurrentImage(currentImage === 0 ? imageListLength - 1 : currentImage - 1);
  }

  function handleNextImage() {
    // console.log("imageList: ", imageList);
    setCurrentImage(currentImage === imageListLength - 1 ? 0 : currentImage + 1);
  }

  return (
    <div>
      {
        imageListLength > 0 ?
          imageListLength !== 1 ?
            <div>
              <IoIosArrowBack onClick={handlePreviousImage} size="30px" color="gray"/>
              <IoIosArrowForward onClick={handleNextImage} size="30px" color="gray"/>
              {
                imageList.map((image, index) => {
                  if (index === currentImage) {
                    return (
                      <div>
                        <img
                          width="200px"
                          key={image.id_image}
                          src={image.name_image}
                          alt={image.name_image}
                        />
                      </div>
                    );
                  }
                  else return "";
                })
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