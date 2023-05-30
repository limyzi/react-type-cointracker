import React from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const PriceWrap = styled.div`
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin-bottom: 2rem;
`

const PriceItem = styled.div`
  background-color: ${props => props.theme.boxColor};
  box-shadow: 0px 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  border-radius: 10px;
  padding: 20px 15px;
  text-align: center;
  &:nth-child(1) {
    grid-area: 1 / 1 / 2 / 3;
  }
  span{
    display: block;
  }
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const PriceColorItem = styled.div<{ $isDown: boolean }>`
  color: ${props => props.$isDown?"#3498DB":"#E74C3C"} !important;
  font-weight: 600;
  display:flex;
  justify-content: center;
  align-items: center;
`
const UpIcon = styled(TrendingUpIcon)<{ $isDown: boolean }>`
  font-size: 1.5rem !important;
  margin-left: 0.5rem;
  display: ${props => props.$isDown?"none":"inline-block"} !important;
`
const DownIcon = styled(TrendingDownIcon)<{ $isDown: boolean }>`
  font-size: 1.5rem !important;
  margin-left: 0.5rem;
  display: ${props => props.$isDown?"inline-block":"none"} !important;
`

interface IMarketData{
  marketData:{
    price_change_24h: number,
    price_change_percentage_24h: number,
    price_change_percentage_7d: number,
    price_change_percentage_30d: number,
    price_change_percentage_60d: number,
    ath:{ usd:number },
    atl:{ usd:number },
  }
}

function Price(){
  const { state: { marketData } } = useLocation<IMarketData>();
  return (
    <>
      <PriceWrap>
        <PriceItem>
          <span>Price changed in 24h</span>
          <PriceColorItem $isDown={marketData.price_change_24h.toString().startsWith("-")}>
            ${marketData.price_change_24h}
            <UpIcon $isDown={marketData.price_change_24h.toString().startsWith("-")}/>
            <DownIcon $isDown={marketData.price_change_24h.toString().startsWith("-")}/>
          </PriceColorItem>
        </PriceItem>
        <PriceItem>
          <span>Price rate changed in 24h</span>
          <PriceColorItem $isDown={marketData.price_change_percentage_24h.toString().startsWith("-")}>
            {marketData.price_change_percentage_24h}%
            <UpIcon $isDown={marketData.price_change_percentage_24h.toString().startsWith("-")}/>
            <DownIcon $isDown={marketData.price_change_percentage_24h.toString().startsWith("-")}/>
          </PriceColorItem>
        </PriceItem>
        <PriceItem>
          <span>Price rate changed in a week</span>
          <PriceColorItem $isDown={marketData.price_change_percentage_7d.toString().startsWith("-")}>
            {marketData.price_change_percentage_7d}%
            <UpIcon $isDown={marketData.price_change_percentage_7d.toString().startsWith("-")}/>
            <DownIcon $isDown={marketData.price_change_percentage_7d.toString().startsWith("-")}/>
          </PriceColorItem>
        </PriceItem>
        <PriceItem>
          <span>Price rate changed in a month</span>
          <PriceColorItem $isDown={marketData.price_change_percentage_30d.toString().startsWith("-")}>
            {marketData.price_change_percentage_30d}%
            <UpIcon $isDown={marketData.price_change_percentage_30d.toString().startsWith("-")}/>
            <DownIcon $isDown={marketData.price_change_percentage_30d.toString().startsWith("-")}/>
          </PriceColorItem>
        </PriceItem>
        <PriceItem>
          <span>Price rate changed in 2 months</span>
          <PriceColorItem $isDown={marketData.price_change_percentage_60d.toString().startsWith("-")}>
            {marketData.price_change_percentage_60d}%
            <UpIcon $isDown={marketData.price_change_percentage_60d.toString().startsWith("-")}/>
            <DownIcon $isDown={marketData.price_change_percentage_60d.toString().startsWith("-")}/>
          </PriceColorItem>
        </PriceItem>
        <PriceItem>
          <span>All Time High</span>
          <PriceColorItem $isDown={false}>
          ${marketData.ath.usd}</PriceColorItem>
        </PriceItem>
        <PriceItem>
          <span>All Time Low</span>
          <PriceColorItem $isDown={true}>
          ${marketData.atl.usd}</PriceColorItem>
        </PriceItem>
      </PriceWrap>
    </>
  )
}

export default Price;