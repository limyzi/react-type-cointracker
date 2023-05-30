import React from "react";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { styled } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo } from "../api";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Helmet } from "react-helmet-async";

interface RouteParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`
const Header = styled.header`
  height:10vh;
  display:flex;
  justify-content: center;
  align-items: center;
  a{
    position: absolute;
    width: 20%;
    left:30px;
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
const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 40px;
  background-color: ${props => props.theme.boxColor};
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0px 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  padding: 0px 10px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.boxColor};
  box-shadow: 0px 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.$isActive?props.theme.accentColor:props.theme.textColor};
  a {
    display: block;
  }
`;

const BackIcon = styled(ArrowBackIosIcon)`
  font-size: 2rem !important;
  color:${props => props.theme.textColor};
`

interface RouteState{
  name:string;
}

interface InfoData{
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  description: {
    en:string
  };
  market_data:{
    current_price:{
      usd: number
    },
    market_cap:{
      usd:number
    },
    total_volume:{
      usd:number
    },
    total_supply:number,
    max_supply:number
  }
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));

  return (
    <Container>
    <Helmet>
      <title>{state?.name ? state.name : infoLoading ? "Loading..." : infoData?.name}</title>
    </Helmet>
    <Header>
      <Link to={`/`}><BackIcon/></Link>
      <Title>{state?.name ? state.name : infoLoading ? "Loading..." : infoData?.name}</Title>
    </Header>
    {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.market_cap_rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>${infoData?.market_data.current_price.usd}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{infoData?.market_data.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{infoData?.market_data.max_supply ?? "-"}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Market Cap</span>
              <span>{infoData?.market_data.market_cap.usd}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Total Volume</span>
              <span>{infoData?.market_data.total_volume.usd}</span>
            </OverviewItem>
          </Overview>
          <Description dangerouslySetInnerHTML={{__html: infoData?.description.en ?? ""}}></Description>
          <Tabs>
            <Tab $isActive={priceMatch!==null}>
              <Link to={{
                pathname:`/${coinId}/price`,
                state:{ marketData: infoData?.market_data }
              }}>Price</Link>
            </Tab>
            <Tab $isActive={chartMatch!==null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId}/>
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}

export default Coin;