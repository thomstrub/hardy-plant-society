import React, { useState } from "react";
import { Button, Form, Segment } from 'semantic-ui-react'
import './PlantPostForm.css';

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
        <Form.Input
          id="tagInput"
          type="text"
          value={searchTag}
          placeholder="Search common or scientific name"
          onChange={handleChange}
        />
        <div id="div">
        <Button  onClick={handleSubmit} value="Search" id="right">Search</Button>
        </div>
    </>
  );
}