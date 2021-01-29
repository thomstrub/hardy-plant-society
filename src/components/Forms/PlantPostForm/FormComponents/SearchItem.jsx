import React from 'react'
import { Item, Segment } from 'semantic-ui-react'

function SearchItem({image, text, value, selected, handlePlantPick}) {


    return(
      
      <Segment id={value} onClick={handlePlantPick} color={selected ? "green" : "grey"} raised={selected}>
      
        <Item.Image inline rounded size='tiny' src={image} />

        <Item.Content>
        <Item.Header style={selected ? {color:"green"} : {color : "grey"}} >{text}</Item.Header>
        
        
        </Item.Content>
        
      
      </Segment>
        
     
    )
    

}

export default SearchItem