import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import styled from 'styled-components'

const Logo = styled.h1`
  font-size: 1.5em;
  margin: 0;
  line-height: 1em;
  font-weight: 400;
  color: #004c8f;
  span {
    color: #f5009a;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
`

const Header = styled.header`
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-bottom: 1px solid #f0f0f0;
  position: ${props => (props.fixed ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.25em 2em;
  z-index: 99;
  height: auto;

  ul {
    padding: 0;
    list-style: none;
    margin: 0;
  }

  li {
    display: inline-block;
    margin: 0 0.5em;
  }

  a {
    color: inherit;
    font-weight: inherit;
    text-decoration: none;
  }

  .active {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`

const GithubIcon = () => {
  const Icon = styled.div`
    width: 1.5em;
    height: 1.5em;
    display: inline-block;
    margin-right: 0.25em;
    vertical-align: middle;
  `;

  return (
    <Icon>
      <svg
        className="github navbar-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32.6 31.8"
        role="img"
        aria-labelledby="github-svg"
      >
        <title id="github-svg">GitHub</title>
        <path d="M16.3 0C7.3 0 0 7.3 0 16.3c0 7.2 4.7 13.3 11.1 15.5.8.1 1.1-.4 1.1-.8v-2.8c-4.5 1-5.5-2.2-5.5-2.2-.7-1.9-1.8-2.4-1.8-2.4-1.5-1 .1-1 .1-1 1.6.1 2.5 1.7 2.5 1.7 1.5 2.5 3.8 1.8 4.7 1.4.1-1.1.6-1.8 1-2.2-3.6-.4-7.4-1.8-7.4-8.1 0-1.8.6-3.2 1.7-4.4-.1-.3-.7-2 .2-4.2 0 0 1.4-.4 4.5 1.7 1.3-.4 2.7-.5 4.1-.5 1.4 0 2.8.2 4.1.5 3.1-2.1 4.5-1.7 4.5-1.7.9 2.2.3 3.9.2 4.3 1 1.1 1.7 2.6 1.7 4.4 0 6.3-3.8 7.6-7.4 8 .6.5 1.1 1.5 1.1 3V31c0 .4.3.9 1.1.8 6.5-2.2 11.1-8.3 11.1-15.5C32.6 7.3 25.3 0 16.3 0z" />
      </svg>
    </Icon>
  );
};

export default ({ currentPath, fixed, nav }) => (
  <Offset fixed={fixed}>
    <Header fixed={fixed}>
      <Logo>
        <Link to="/">Easy<span>GraphQL</span></Link>
      </Logo>
      {!nav ? (
        <ul>
          <li>
            <Link
              className={classnames({
                active:
                  currentPath.startsWith('/docs') &&
                  currentPath !== '/docs/getting-started/guide',
              })}
              to="/docs/getting-started/overview"
            >
              Documentation
            </Link>
          </li>
          <li>
            <a target='_blank' href="https://github.com/EasyGraphQL">
              <GithubIcon />
              GitHub
            </a>
          </li>
        </ul>
      ) : (
        nav
      )}
    </Header>
  </Offset>
)

const Offset = ({ fixed, children }) => {
  return fixed ? (
    <div>
      {children}
      <div style={{ height: '68px' }} />
    </div>
  ) : (
    children
  )
}
