import React from 'react'
import Link from 'gatsby-link'
import classnames from 'classnames'
import styled from 'styled-components'

const Wrapper = styled.nav`
  position: fixed;
  padding: 0 2em 4em 2em;
  height: 100vh;
  width: 20%;
  overflow: auto;
  background: #f9fbfd;
  border-right: 1px solid #f0f0f0;

  @media ${props => props.theme.mobile} {
    width: 100%;
    position: relative;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid #f0f0f0;
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: ${props => (props.inner ? '1em' : '2em')};
`

const ListItem = styled.li`
  margin: 0 0 1em 0;
  padding: 0;
  font-weight: 600;
  ${props =>
    props.inner
      ? `
  font-weight: 400;
  font-size: .9rem;
  margin-left: 1em;
  margin-bottom: .75em;`
      : ''} a {
    color: inherit;
    text-decoration: none;

    &.active {
      color: ${props => props.theme.colors.primary};
      font-weight: 600;
    }
  }
`

export default ({ currentPath, nav }) => (
  <Wrapper>
    <List>
      {nav.map(parent => {
        return (
          <ListItem key={parent.path}>
            <Link to={parent.path}>{parent.title}</Link>
            <List inner>
              {parent.children.map(child => (
                <ListItem key={child.path} inner>
                  <Link
                    to={child.path}
                    className={classnames({
                      active: currentPath === child.path,
                    })}
                  >
                    {child.title}
                  </Link>
                </ListItem>
              ))}
            </List>
          </ListItem>
        )
      })}
    </List>
  </Wrapper>
)
