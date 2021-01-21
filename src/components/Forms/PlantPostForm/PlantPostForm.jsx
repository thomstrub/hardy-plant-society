import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Radio, Segment } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import PlantSearchBar from './PlantSearchBar'
import PlantSearchResults from './PlantSearchResults'
import RadioComponent from './RadioComponent'


export default function PlantPostForm(props){

 // Trefle API variables
 const KEY = process.env.TREFLETOKEN
 const TREFLE_BASE_URL = `https://trefle.io/api/v1/species/search?token=nGl9aJhLyHSPDXgy_7THrf3UycmVNDpcU4kvluaWwZQ&q=`
 const proxyurl = "https://cors-anywhere.herokuapp.com/";

    //---------------------------------------- state hooks --------------------------------------//
   // Image to be uploaded to AWS 
  const [selectedFile, setSelectedFile] = useState('')
  // Custom form data
  const [state, setState] = useState({
    forSale: false,
    isSeed: false,
    isRootstock: false,
    dateCollected: new Date(),
    quantity: 1,
    description: "",
    photoUrl: "",
    plant: "",
    cultivar: ""

  })

  // Plant Search Results state
  const [selectState, setSelectState] = useState('');

  // Radio Toggle State
  const [radioToggle, setRadioToggle] = useState(true);

  // Trefle API data
  const [trefleData, setTrefleData] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [toggle, setToggle] = useState(true);
  const [selectData, setSelectData] = useState([]);
  const [selectedPlantData, setSelectedPlantData] = useState({})
//---------------------------------------- useEffect --------------------------------------//
  // Trefle Search API Call
  useEffect(() => {
    console.log(searchTag, "useEffect searchTag");
    const trefleUrl = `${TREFLE_BASE_URL}${searchTag.replace(/\s/g, '&')}`;
    fetch(proxyurl + trefleUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data, "json data");
        setTrefleData(data.data);
        
      });
  }, [searchTag]);
  
  // creates array for select menu from Trefle Data
  useEffect(() => {
    if(trefleData){
        let mappedData = trefleData.map((result, index) => {
            return ({
                key: result.slug,
                text: result.common_name ? result.common_name + " / " + result.scientific_name : result.scientific_name,
                value: result.slug,
                image: { avatar: true, src: result.image_url }
            })
        });
        setSelectData(mappedData);
        console.log(selectData, "<----selectData from useEffect")
    }
  }, [trefleData]);

  useEffect(() => {
    setState({
        ...state,
        plant: selectState
    })
  }, [selectState])

//   // builds plant data for database from selected plant
//   // Plant Specific API Call
//   useEffect(() => {
//     console.log(selectState, "<-----selectData")
//     const treflePlantUrl = `https://trefle.io/api/v1/plants/${selectState}?token=nGl9aJhLyHSPDXgy_7THrf3UycmVNDpcU4kvluaWwZQ`;
//     fetch(proxyurl + treflePlantUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.data.main_species, "json data from selected plant");
//         if(!firstRender.current){
//             setSelectedPlantData(data.data.main_species);
//         }
        
//         console.log(selectedPlantData, "Selected Plant Data")
        
//       });
//     }, [selectState]);
    

//     // Problem solving... debuggin render issue
    
//         const firstRender = useRef(true);
      
//         useEffect(() => {
//             firstRender.current = false;
//           }, []);
      
        

    

//     useEffect(() => {
        
//         if(firstRender.current === false){
//             setState({
//                 ...state,
//                 plant: {
//                     commonName: (selectedPlantData.common_name ? selectedPlantData.common_name: "nothing"),
//                     genus: selectedPlantData.genus,
//                     species: selectedPlantData.scientific_name,
//                     description: `From the family ${selectedPlantData.family} ${selectedPlantData.family_common_name ? selectedPlantData.family_common_name : '' }. Observed as a native species from ${selectedPlantData.observations}.`,
//                     photoUrl: selectedPlantData.image_url
//                 }
//             })
//             console.log(state, "state from useEffect")
//         }
        
        
//     }, [selectedPlantData])
  //---------------------------------------- functions- handlers / submit --------------------------------------//

  // Trefle API submit handler
  const handleTrefleSubmit = (e, tag) => {
    e.preventDefault()
    console.log("From App - making API Call - tag - >", tag);
    setSearchTag(tag);
    setToggle(!toggle);
  };

    // Plant Search Results hanlder
    function handleSelectChange(e, result){
        setSelectState(result.value)
        
        console.log(result, "dropdown Change")
        }

  // Photo File
  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

  // update values for text fields
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  // toggle between Seed and Plant submission
  function handleToggle(e){
      setState({
          ...state,
          isSeed: state.isSeed ? false : true,
          isRootstock: state.isSeed ? false : true
      })
      setRadioToggle(!radioToggle);
  }

  // datepicker handler
  function handleDate(event, data){
    setState({
        ...state,
        dateCollected: data.value
      })
  }


  


  //main form submit handler
  function handleSubmit(e){



    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('forSale', state.forSale)
    formData.append('isSeed', state.isSeed)
    formData.append('isRootstock', state.isRootstock)
    formData.append('dateCollected', state.dateCollected)
    formData.append('quantity', state.quantity)
    formData.append('description', state.description)
    formData.append('plant', state.plant)
    formData.append('cultivar', state.cultivar)
    props.handleAddPost(formData)
    
  }


  return (
    
  
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
              <h3>What are you contributing?</h3>
              <RadioComponent handleChange={handleToggle} toggle={radioToggle} />
              
              {state.isSeed ? 
              <p>Collected seeds, or a plant that has set seed and can be harvested</p>
              :
              <p>Mature plant with established roots or runners that can transplanted.</p>
              }
              
              
              <PlantSearchBar handleSubmit={handleTrefleSubmit} />
              
              <PlantSearchResults selectData={selectData} handleChange={handleSelectChange} selectState={selectState}/>

              <Form.Input
                  className="form-control"
                  name="cultivar"
                  value={state.cultivar}
                  placeholder="Cultivar name if known or if it exists..."
                  onChange={handleChange}
                  required
              /> 
              <Form.Input
                  className="form-control"
                  name="description"
                  value={state.description}
                  placeholder={state.isSeed ? "Describe your collection of seeds or plant that has set seed" : "Describe your rootstock or runners that are ready to be transplanted"}
                  onChange={handleChange}
                  required
              /> 
              <h3>How many {state.isSeed ? "packets of seed" : "plants"} do you have?</h3>
              <Form.Input
                className="form-control"
                name="quantity"
                value={state.quantity}
                onChange={handleChange}
                required
              />
              <h3>When was this collected?</h3>
              <SemanticDatepicker value={state.dateCollected} onChange={handleDate} />
              <h3>Do you have a photo?</h3>
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />   
              <Button
                type="submit"
                className="btn"
              >
                SUBMIT
              </Button>
            </Form>
          </Segment>
     
   
  ); 
}