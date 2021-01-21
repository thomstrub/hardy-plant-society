import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

export default function RadioComponent(props) {
  

    return (
      <Form>
        <Form.Field>
          <Radio
            label='Rootstock'
            name='radioGroup'
            value='isRootstock'
            checked={props.toggle}
            onChange={props.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Seed'
            name='radioGroup'
            value='isSeed'
            checked={!props.toggle}
            onChange={props.handleChange}
          />
        </Form.Field>
      </Form>
    )
  }
