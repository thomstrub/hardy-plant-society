import React, {useState} from 'react'
import { Dropdown } from 'semantic-ui-react'



export default function DropdownExampleSelection(props){



  return(
    <Dropdown
    value={props.selectState}
    placeholder='Select Plant'
    noResultsMessage='No Results'
    fluid
    selection
    options={props.selectData}
    onChange={props.handleChange}
  />
  )
  
} 
  

