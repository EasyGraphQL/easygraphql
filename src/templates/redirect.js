import React from 'react'
import { Redirect } from 'react-router'

export default ({ pathContext }) => {
  return <Redirect to={pathContext.to} />
}
