import React from 'react'
import styled from 'styled-components'

const Window = styled.div`
  max-width: 700px;
  margin: 0em auto 4em;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 1px 20px 0px rgba(66, 66, 66, 0.13);
  box-shadow: 0 2px 42px 0px rgba(30, 112, 167, 0.39);
  background: white;
`

const Bar = styled.div`
  background: #f9f9f9;
  border-bottom: 1px solid #ebebeb;
  height: 40px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.8em;
  text-align: center;
  &:before {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 40px;
    height: 12px;
    width: 12px;
    display: block;
    border-radius: 50%;
    transform: translateY(-50%);
    background: #febd31;
    box-shadow: 20px 0px 0px 0px #30c240, -20px 0px 0px 0px #fb6056;
  }
`

const Content = styled.div`
  min-height: 150px;
  white-space: pre-wrap;
`

export default props => (
  <Window>
    <Bar>{props.title || ''}</Bar>
    <Content>{props.children}</Content>
  </Window>
)
