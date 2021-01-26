import React, {useState, useEffect} from 'react'
import { Dropdown, Item } from 'semantic-ui-react'
import SearchItem from './SearchItem'



export default function DropdownExampleSelection(props){

 
  const[results, setResults] = useState([]);



  useEffect(() => {
    if(props.trefleData){
        let mappedData = props.trefleData.slice(0,5).map((result, index) => {
          return(
            <SearchItem  selected={props.selected === result.slug ? true : false} handlePlantPick={props.handlePlantPick} image={result.image_url} key={index} text={result.common_name ? result.common_name + " / " + result.scientific_name : result.scientific_name} value={result.slug} />
          )
        });
        
        setResults(mappedData);
        console.log(results, "<----results from useEffect")
    }
  }, [props.trefleData, props.selected]);
  




  return(
    <>

      <Item.Group>
      {results}
    </Item.Group>
  </> 
  )
  
} 
  

