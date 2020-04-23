
import React from 'react'
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { Columns, Column, Container, Section, Title, Subtitle } from 'bloomer'

export default () => (
  <Section className="has-background-primary">
    <Container>
      <Columns isCentered>
        <Column isSize="1/2">
          <Link to="/">
            <Title hasTextColor="white" isSize={1}>
              Speed Typer
            <span style={{ marginLeft: "1rem" }}><FontAwesomeIcon icon={faFlagCheckered} /></span>
            </Title>
          </Link>
          <Subtitle hasTextColor="white">How many words can you type before time runs out...</Subtitle>
        </Column>
      </Columns>
    </Container>
  </Section >
)
