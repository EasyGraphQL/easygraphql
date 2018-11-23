import React, { Component } from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
 background: #F9F8F9;
 border-top: 1px solid #ebebeb;
 padding: 1em;`

const Content = styled.div`
  text-align: center;`

export default () => (
  <Footer>
    <Content>
      <div>Made by <a href="https://twitter.com/estrada9166">@estrada9166</a> &nbsp; &nbsp; &bull; &nbsp; &nbsp; Questions? Ask <a href="https://twitter.com/estrada9166">@estrada9166</a></div>
    </Content>
  </Footer>
)