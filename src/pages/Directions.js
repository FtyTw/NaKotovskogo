import React from 'react'
import { useRouteMatch, Switch, Redirect, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

import { DirectionContainer } from '../components'

const Directions = () => {
  const { path } = useRouteMatch()

  return (
    path && (
      <Container className="mt-5 pl-4 pr-4">
        <Row>
          <Switch>
            <Route exact path={path}>
              <Redirect to={`directions/calligraphy`} />
            </Route>
            <Route path={`${path}/:type`}>
              <DirectionContainer />
            </Route>
          </Switch>
        </Row>
      </Container>
    )
  )
}

export default Directions
