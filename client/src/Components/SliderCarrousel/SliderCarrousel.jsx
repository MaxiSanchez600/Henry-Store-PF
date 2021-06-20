import { useState } from 'react';

import IMAGES from "../../Assets/images.json";

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
              <button onClick={handlePreviousImage}>
                <span className="iconify" data-icon="ic:outline-navigate-before" data-inline="false"></span>
              </button>
              <button onClick={handleNextImage}>
                <span className="iconify" data-icon="ic:outline-navigate-next" data-inline="false"></span>
              </button>
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