import React, {useState, useEffect} from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function returnImages(images){
    const imageElems = images.map((image, idx) => {
        return(
            <Slide key={idx} index={idx}><img width={240} src={image} alt="flower or habitat photo"/></Slide>
        )
    });
    return(imageElems);
}

export default function Carousel({plant}) {
    
    const [images, setImages] = useState([]);
    
    // API returns images of flower and images of habitat (among others)
    useEffect(() => {
        const flowers = plant.flowerImages.map((flower) =>{
            return(flower.image_url)
        })
        const plantImages = plant.habitImages.map((plantImage) =>{
            return(plantImage.image_url)
        })
        setImages(returnImages(flowers.concat(plantImages)));
    }, [])
    
    
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
