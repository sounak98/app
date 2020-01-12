import React, { Component } from 'react'
import styled from 'react-emotion'
import { Link as DefaultLink } from 'react-router-dom'

import { TOKEN_DECIMALS_QUERY } from '../../graphql/queries'
import SafeQuery from '../SafeQuery'

import { depositValue } from '../Utils/DepositValue.js'
import DefaultEventDate from '../Utils/EventDate.js'
import Currency from '../SingleEvent/Currency'

const Link = styled(DefaultLink)`
  color: #2b2b2b;
  text-align: left;
`

const EventCardContainer = styled('li')`
  background: #f8f9fb;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  overflow: hidden;
`
const EventImage = styled('img')``

const EventDate = styled(DefaultEventDate)`
  font-family: Muli;
  font-weight: 500;
  font-size: 13px;
  color: #3d3f50;
  line-height: 21px;
  display: block;
  margin-top: 5px;
  margin-bottom: 20px;
`

const EventName = styled('h3')`
  font-family: Muli;
  font-weight: 700;
  font-size: 18px;
  color: #1e1e1e;
  letter-spacing: 0;
  line-height: 25px;
  margin: 0;
`

const EventDetails = styled('section')`
  padding: 20px;
`

const Deposit = styled('span')`
  font-size: 11px;
  font-style: italic;
`

class EventCard extends Component {
  render() {
    const { party } = this.props
    const { address, headerImg, deposit, name, tokenAddress } = party

    return (
      <EventCardContainer>
        <Link to={`/event/${address}`}>
          <EventImage src={headerImg || 'https://placeimg.com/640/480/tech'} />
          <EventDetails>
            <EventName>{name}</EventName>
            <EventDate event={party} />
            <SafeQuery
              query={TOKEN_DECIMALS_QUERY}
              variables={{ tokenAddress }}
              renderError={err => {
                return (
                  <Deposit>
                    Can't find token contract at address {tokenAddress}
                  </Deposit>
                )
              }}
            >
              {({
                data: {
                  token: { decimals }
                },
                loading
              }) => {
                return (
                  <Deposit>
                    {depositValue(deposit, decimals)}{' '}
                    <Currency tokenAddress={tokenAddress} />
                  </Deposit>
                )
              }}
            </SafeQuery>
          </EventDetails>
        </Link>
      </EventCardContainer>
    )
  }
}

export default EventCard
