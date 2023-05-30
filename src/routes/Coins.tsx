import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`
const Header = styled.header`
  height:10vh;
  display:flex;
  justify-content: center;
  align-items: center;
`

const CoinList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  grid-column-gap: 10px;
`

const Coin = styled.div`
  background-color: white;
  color:${props => props.theme.titleColor};
  margin-bottom: 10px;
  padding:20px;
  border-radius: 15px;
  box-shadow: 0px 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  a{
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover{
    a{
      color:${props => props.theme.accentColor}
    }
  }
`

const Title = styled.h1`
  font-size: 48px;
  color:${props => props.theme.accentColor};
`

const Loader = styled.span`
  text-align:center;
  display: block;
`

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`

const Name = styled.span`
  font-size: 1.2rem;
`

const PriceBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 5px;
  margin-top:10px;
  font-size:1.1rem;
`

const Price = styled.div`
`

const Change = styled.div<{ $isDown: boolean }>`
  text-align: right;
  color: ${props => props.$isDown?"#3498DB":"#E74C3C"}
`

interface ICoin {
  id: string,
  symbol: string,
  name: string,
  image: string,
  current_price: number,
  market_cap: number,
  market_cap_rank: number,
  fully_diluted_valuation: number,
  total_volume: number,
  high_24h: number,
  low_24h: number,
  price_change_24h: number,
  price_change_percentage_24h: number,
  market_cap_change_24h: number,
  market_cap_change_percentage_24h: number,
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  return (
  <Container>
    <Header>
      <Title>Coins</Title>
    </Header>
    {
      isLoading? <Loader>Loading ...</Loader> : (
      <CoinList>
      {data?.slice(0, 100).map((coin) => (
        <Coin key={coin.id}>
          <Link to={{
            pathname:`/${coin.id}`,
            state:{ name: coin.name },
          }}>
            <Img 
            src={coin.image}/>
            <Name>{coin.name}</Name>
            </Link>
            <PriceBox>
            <Price>${coin.current_price}</Price>
            <Change $isDown={coin.market_cap_change_percentage_24h.toString().startsWith("-")}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </Change>
            </PriceBox>
        </Coin>
      ))}
    </CoinList>
      )
    }
  </Container>
  )
}

export default Coins;