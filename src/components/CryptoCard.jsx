import React, {useState, useEffect} from 'react';
import PriceChange from './PriceChange';
import { Chart, Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

export default function CryptoCard(props) {
  const [chartData, setChartData] = useState(null);
  Chart.register(annotationPlugin);

  useEffect(() => {
      
      fetch('https://api.coinstats.app/public/v1/charts?period=24h&coinId='+props.coinID)
        .then(response => {
          if(!response.ok){
            throw response;
          }
          return response.json();
        }).then(result => {
          setChartData(result);
        }).catch(error => console.error(error));

  }, []);

  const getGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0.1, 'rgba(240, 222, 208, 0.3)');   
    gradient.addColorStop(0.6, 'rgba(240, 222, 208, 0.1)');
    gradient.addColorStop(1, 'rgba(240, 222, 208, 0)');
    return gradient;
  }

  const data = {
      labels: chartData?.chart.map(item => item[0]),
      datasets: [
        {
          data: chartData?.chart.map(item => item[1]),
          fill: 'start',
          backgroundColor:function(context) {
            return getGradient(context.chart.ctx);
          },
          borderColor: 'rgba(240, 222, 208, 1)',
          borderWidth: 0.6
        },
      ]
  };

  const MaxVal = (arr) => {
    if(typeof arr !== 'undefined'){
      return Math.max(...arr);
    }
  }
  const MinVal = (arr) => {
    if(typeof arr !== 'undefined'){
      return Math.min(...arr);
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point:{
          radius: 0
      }
    },
    layout: {
      padding:{
        left: -10
      } 
    },
    plugins:{
      legend: false,
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            scaleID: 'yAxis',
            value: Number(MaxVal(data.datasets[0].data)).toFixed(3),
            borderColor: 'rgb(41, 150, 41)',
            borderWidth: 1,
            label: {
              enabled: true,
              position: "start",
              backgroundColor: 'rgb(41, 150, 41)',
              content: Number(MaxVal(data.datasets[0].data)).toFixed(2),
            },
          },
          line2: {
            type: 'line',
            scaleID: 'yAxis',
            value: Number(MinVal(data.datasets[0].data)).toFixed(3),
            borderColor: 'rgb(150, 40, 40)',
            borderWidth: 1,
            label: {
              enabled: true,
              position: "end",
              backgroundColor: 'rgb(150, 40, 40)',
              content: Number(MinVal(data.datasets[0].data)).toFixed(2),
            },
          }
        }
      }
    },
    scales: {
      yAxis: {
        id: "yAxis",
        ticks: {
          beginAtZero: false,
          display: false
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      xAxis: {
        ticks: {
          beginAtZero: false,
          display: false
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  const SupplyProgress = () => {
    
    if(props.tSupply === 0){
      return 0
    }
    return Number((props.aSupply / props.tSupply) * 100).toFixed(2);

  }
  
  return (
    <div className="card">
      <img src={props.image} alt="icon" style={{ height: 50, position: 'absolute', top: -26, left: 0, right: 0, margin: 'auto' }} />
      <div className="card-header text-center title">
        {props.title} <span>[{props.symbol}]</span>
      </div>
      <div className="card-body">
        <div className="row mb-3 price">
          <div className="col-12 text-center">
            <h1><span>$</span>{Number(props.price).toFixed(2)}</h1>
          </div>
        </div>
        <div className="row mb-2 supply">
          <div className="col-12 text-center">
            <label className="mb-1">Supply</label>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: SupplyProgress() + '%' }} aria-valuenow={SupplyProgress()} aria-valuemin="0" aria-valuemax="100">{SupplyProgress()} %</div>
            </div>
          </div>
        </div>
        <div className="row mt-3 price-change">
          <label className="mb-1">Price change</label>
          <PriceChange title={"HOUR"} price={props.priceChangeH} />
          <PriceChange title={"DAY"} price={props.priceChangeD} />
          <PriceChange title={"WEEK"} price={props.priceChangeW} />
        </div>
        <div className="row mt-3 chart">
          <label className="mb-1">Last 24h</label>
          <div className="col-12">
            <Line data={data} options={options}/>
          </div>
        </div>
      </div>
    </div>
  )
}
