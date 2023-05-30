import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps{
  coinId: string;
}

function Chart({coinId}: ChartProps){
  const { isLoading, data } = useQuery<number[][]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  const isDark = useRecoilValue(isDarkAtom);
  
  return (
    <div>
      {isLoading?"Loading chart..."
      :<>
      <ApexCharts 
        type="candlestick"
        series={[{
          name:"price",
          data: data??[]
        }]}
        options={{
          theme:{
            mode: isDark?"dark":"light"
          },
          chart:{
            height:500, 
            width:500,
            toolbar: {
              show: false
            },
            background:"transparent"
          },
          xaxis:{
            axisTicks:{
              show: false
            },
            type:"datetime"
          },
          plotOptions:{
            candlestick:{
              colors: {
                upward: '#3C90EB',
                downward: '#f06250'
              }
            }
          }
        }
        }/>
        </>
      }
    </div>
  )
}

export default Chart;