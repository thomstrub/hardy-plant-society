import React, {useState, useEffect} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Image } from 'semantic-ui-react'

function returnImages(images){
    const imageElems = images.map((image, idx) => {
        return(
            <Slide key={idx} index={idx}><img src={image}/></Slide>
        )
    });
    return(imageElems);
}

export default function Carousel({plant}) {
    
    const [images, setImages] = useState([]);
    console.log(plant.flowerImages.concat(plant.habitImages), "image array")
    useEffect(() => {
        const flowers = plant.flowerImages.map((flower) =>{
            return(flower.image_url)
        })
        const plantImages = plant.habitImages.map((plantImage) =>{
            return(plantImage.image_url)
        })
        setImages(returnImages(flowers.concat(plantImages)));
    }, [])
    console.log(images, "images")
    
      return (
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={images.length}
        >
          <Slider>
          {images}
          
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      );
    
  }
