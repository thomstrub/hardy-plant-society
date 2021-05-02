import React, { useState } from "react";
import { Button, Form } from 'semantic-ui-react'
import '../PlantPostForm.css';

export default function PlantSearchBar(props) {
  const [searchTag, setSearchTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // remove spaces- use regex
    props.handleSubmit(e, searchTag);
    setSearchTag("");
  };

  const handleChange = (e) => {
    const tag = e.target.value;
    setSearchTag(tag);
  };

  return (
    <>
        <h3> Find your plant to get started</h3>
        <div style={{display: "inline-flex"}}>
        <Form.Input
          style={{width:"45vw", marginRight: "12px"}}
          size="huge"
          id="tagInput"
          type="text"
          value={searchTag}
          placeholder="Search common or scientific name"
          onChange={handleChange}
        />
        
        <Button
        style={{height: "55px"}}
        size="huge" 
        onClick={handleSubmit} 
        value="Search" 
        id="right">Search</Button>
        
        </div>
    </>
  );
}