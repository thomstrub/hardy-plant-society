import React from 'react'
import './PlantPostForm.css'
import RadioComponent from './FormComponents/RadioComponent'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Checkbox, Form} from 'semantic-ui-react';

 export default function PlantPostFormPart2({toggleFormPart, user, handleToggle, radioToggle, state, handleChange, handleDate, handleForSaleChange, handleFileInput}){
     return(
        <>
            <div id="div">
                <Button  onClick={toggleFormPart} value="Next" id="left">Back</Button>
            </div>
            
            
            <h3>What are you contributing?</h3>
            

            <Form.Input
                className="form-control"
                name="cultivar"
                value={state.cultivar}
                placeholder="Cultivar name if known or if it exists..."
                onChange={handleChange}
                required
                
            /> 
            <Form.TextArea
                className="form-control"
                name="description"
                value={state.description}
                placeholder={state.isSeed ? "Describe your collection of seeds or plant that has set seed" : "Describe your rootstock or runners that are ready to be transplanted"}
                onChange={handleChange}
                required
                
            /> 

            
            <RadioComponent handleChange={handleToggle} toggle={radioToggle} />
            
            {state.isSeed ? 
            <p>Collected seeds, or a plant that has set seed and can be harvested</p>
            :
            <p>Mature plant with established roots or runners that can transplanted.</p>
            }

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

            {user.isAdmin ? 
            <Form.Field>
                <Checkbox
                    label='For Sale'
                    name='forSale'
                    value='forSale'
                    checked={state.forSale}
                    onClick={handleForSaleChange}
                    required
                />
            </Form.Field> 
            : 
            ""}
            

            <h3>Add a photo</h3>
            <Form.Input
            className="form-control"
            type="file"
            name="photo"
            placeholder="upload image"
            onChange={handleFileInput}
            />  
            <div id="div">
            <Button
            color="green"
            size="huge"
            type="submit"
            id="right"
            
            >
            Submit
            </Button>
            </div> 
        </>
     )
 }