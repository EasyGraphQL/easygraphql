import React, { Component } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Editor from '../components/Editor'
import Button from '../components/Button'
import ProgramWindow from '../components/ProgramWindow'
import snippets from '../../utils/snippets'

const Hero = styled.div`
  z-index: 1;
  background-color: #004c8f;
  color: #fff;
  padding: 70px;
  border-radius: 0 0 50% 50% / 4%;
  display: flex;
  justify-content: space-between;

  section:first-child {
    width: 50%;
    margin-left: 3%;
  }

  section:last-child {
    width: 45%;
  }

  h2 {
    margin-top: 1.5rem;
    font-size: 3.5em;
    margin-bottom: 0.25em;
    font-weight: bold;
    letter-spacing: 1.5px;
    line-height: 1.05em;
    display: inline-block;
    span {
      color: #f5009a;
    }
  }

  h3 {
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 1.5em;
    font-weight: 300;
    span {
      color: #f5009a;
    }
  }

  @media ${props => props.theme.tablet} {
    padding: 50px 15px;
    flex-direction: column;

    h2 {
      font-size: 2.5em;
    }

    h3 {
      font-size: 1.25em;
    }

    section:first-child, section:last-child {
      width: 100%;
    }

    section:first-child {
      margin: 0 0 2em 0;
    }
  }
`

const Philosophy = styled.section`
  background: #f9f8f9;
  display: flex;
  justify-content: space-around;
  margin-top: -2em;
  padding: 5em 2em 2em 2em;

  div {
    width: 30%;
  }

  h3 {
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin-top: 0;
  }

  @media ${props => props.theme.tablet} {
    flex-direction: column;

    div {
      width: 90%;
      margin: auto;
    }
  }
`

class IndexPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: null,
      snippet: null
    }
  }

  componentDidMount() {
    const snippet = snippets[Math.floor(Math.random() * snippets.length)];
    this.setState({
      name: snippet.name,
      snippet: snippet.snippet
    })
  }

  render() {
    return (
      <div>
        <Header currentPath={this.props.location.pathname} fixed />
        <Hero>
          <section>
            <h2>Easy<span>GraphQL</span></h2>
            <h3>
              Easy<span>GraphQL</span> is a group of open source tools, with 
              the main focus to help developers that use <span>GraphQL</span> or just
              want to start using it.
              <br />
              <br />
              As the name says, the main focus is to make the actual tools easy to use,
              with the lowest configuration possible .
            </h3>
            <Button to="/docs/getting-started/overview" large>
              Documentation
            </Button>
          </section>
          <section>
            <ProgramWindow title={this.state.name}>
              <Editor
                value={this.state.snippet}
                setOptions={{ minLines: 20, maxLines: 20 }}
              />
            </ProgramWindow>
          </section>
        </Hero>
        <Philosophy>
          <div>
            <h3>Easy to use</h3>
            <p>
              The main idea behind the actual tools is that the configuration requires
              to use them with GraphQL, is the minimum required, so, you don't spend
              a lot of time trying to set up a project.
            </p>
          </div>
          <div>
            <h3>Open Source</h3>
            <p>
              All the projects are open source, the main idea is to continue improving and maintaining
              them so everybody can have access and use in their projects.
            </p>
          </div>
        </Philosophy>
        <Footer />
      </div>
    )
  }
}


export default IndexPage
