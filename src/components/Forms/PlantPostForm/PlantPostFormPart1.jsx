import React from 'react'
import PlantSearchBar from './PlantSearchBar'
import PlantSearchResults from './PlantSearchResults'
import { Button} from 'semantic-ui-react'

 export default function PlantPostFormPart1({selected, handlePlantPick, trefleData, toggleFormPart, handleTrefleSubmit}){
     return(
     <>
        <PlantSearchBar handleSubmit={handleTrefleSubmit} />
              
        <PlantSearchResults selected={selected} handlePlantPick={handlePlantPick} trefleData={trefleData}/>
        {trefleData ?
            <div id="div">
        <Button  onClick={toggleFormPart} value="Next" id="right">Next</Button>
        </div>
        :
        ""
        }
        
     </>
     )
 }