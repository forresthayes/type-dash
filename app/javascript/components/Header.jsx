
import React from 'react'
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import {
  Columns, Column, Container, Title, Subtitle,
  Hero, HeroBody, HeroFooter, Tabs, TabList, Tab
} from 'bloomer'

export default () => (
  <Hero isSize="small" isColor="primary" isBold>
    <Columns isCentered>
      <Column isSize="1/2">
        <HeroBody>
          <Container style={{ paddingTop: "1.5rem" }}>
            <Title isSize={1}>
              <Link to="/" style={{ color: "white" }}>
                Speed Typer
                <span style={{ marginLeft: "1rem" }}><FontAwesomeIcon icon={faFlagCheckered} /></span>
              </Link>
            </Title>
            <Subtitle hasTextColor="white">How many words can you type before time runs out?</Subtitle>
          </Container>
        </HeroBody>

        <HeroFooter>
          <Tabs isBoxed>
            <Container>
              <TabList isAlign="right">
                <Tab className="is-uppercase"><Link to="/">play</Link></Tab>
                <Tab className="is-uppercase"><Link to="/high-scores">high scores</Link></Tab>
              </TabList>
            </Container>
          </Tabs>
        </HeroFooter>
      </Column>
    </Columns>
  </Hero>
)