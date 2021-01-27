import React, { useState, useEffect } from 'react';
import { Form, Segment } from 'semantic-ui-react'

import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';


import * as plantPostAPI from '../../../utils/plantPostService'
import PlantPostFormPart1 from './PlantPostFormPart1'
import PlantPostFormPart2 from './PlantPostFormPart2'

export default function PlantPostForm(props){

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
    cultivar: "",
    partOne: true

  })

  // Plant Search Results state
  const [selected, setSelected] = useState('');
  const [selectState, setSelectState] = useState('');

  // Radio Toggle State
  const [radioToggle, setRadioToggle] = useState(true);

  // Trefle API data
  const [trefleData, setTrefleData] = useState("");
  const [searchTag, setSearchTag] = useState("astilbe");
  const [toggle, setToggle] = useState(true);
 
  

 
//---------------------------------------- useEffect --------------------------------------//

   // Back end Trefle search request 
  
   async function getTrefleData(search){
   
   try {
     const data = await plantPostAPI.searchTrefle(search);
     console.log(data.json.data, "data from postform page")
     setTrefleData([...data.json.data])
   } catch(err){
     console.log(err, ' this is the error')
   }
   }  

   useEffect(() => {
       getTrefleData(searchTag)
   }, [searchTag])
  

  // useEffect needed to update state due to asynchronous nature of setState
  useEffect(() => {
    setState({
        ...state,
        plant: selected
    })
    
}, [selected])

  //---------------------------------------- functions- handlers / submit --------------------------------------//
  // handler for form part 1
  function handlePlantPick(e){
    e.preventDefault()
    
    setSelected(e.target.id);
    console.log("Selected", selected)
     setState({
        ...state,
        plant: e.target.id
    })   
    
  }

    function toggleFormPart(e){
      e.preventDefault()
    
      setState({
        ...state,
        partOne: !state.partOne
      })
  }

  // Trefle API submit handler
  const handleTrefleSubmit = (e, tag) => {
    e.preventDefault()
    console.log("From App - making API Call - tag - >", tag);
    setSearchTag(tag.replace(/\s/g, '&'));
    setToggle(!toggle);
  };


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

  function handleForSaleChange(){
      setState({
          ...state,
          forSale: !state.forSale
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
            <div hidden={!state.partOne}><PlantPostFormPart1 selected={state.plant} handlePlantPick={handlePlantPick} toggleFormPart={toggleFormPart} handleTrefleSubmit={handleTrefleSubmit} trefleData={trefleData} /></div>
            <div hidden={state.partOne}><PlantPostFormPart2 toggleFormPart={toggleFormPart} user={props.user} handleToggle={handleToggle} radioToggle={radioToggle} state={state} handleChange={handleChange} handleDate={handleDate} handleForSaleChange={handleForSaleChange} handleFileInput={handleFileInput}/></div>

            </Form>
            
          </Segment>
     
   
  ); 
}