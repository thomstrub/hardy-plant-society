import React, { useState } from 'react'
import PlantCard from '../PlantCard/PlantCard'
import { Button, Divider, Image, Transition } from 'semantic-ui-react'

export default function TransitionExampleTransition() {
  const [visible, setVisible] = useState(true)

  function toggleVisibility(){
    setVisible(!visible)
  }

    return (
      <div>
        <Button
          content={visible ? 'Hide' : 'Show'}
          onClick={toggleVisibility}
        />
        <Divider hidden />
        <Transition visible={visible} animation='horizontal flip' duration={500}>
          <Image size='small' src='https://react.semantic-ui.com/images/leaves/1.png' />
        </Transition>
      </div>
    )

}
