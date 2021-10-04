import React from 'react'
import { Image, Label } from 'semantic-ui-react'

const UserLabel = (props) => {
  return (
    <Label basic image >
      <Image src={props.avatar_url} avatar />
      {props.name}
    </Label>
  )
}

export default UserLabel
