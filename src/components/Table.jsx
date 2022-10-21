import React, {useState, useEffect} from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';

export default function Table() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=100")
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((result) => {
      let responseData = result;
        setData(responseData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">1h %</th>
          <th scope="col">24h %</th>
          <th scope="col">7d %</th>
          <th scope="col">Volume</th>
        </tr>
    </thead>
    <tbody>
      {data?.coins.map((item) => (
      <Row
        rank={item.rank}
        icon={item.icon}
        name={item.name}
        symbol={item.symbol}
        price={item.price}
        priceChangeH={item.priceChange1h}
        priceChangeD={item.priceChange1d}
        priceChangeW={item.priceChange1w}
        volume={item.volume}
      />
      ))}
      </tbody>
    </table>
  )
};

function Row(props) {
  return (
    <tr>
      <th scope="col">#{props.rank}</th>
      <th scope="col"><img className="icon" src={props.icon} /> <b>{props.name}</b>({props.symbol})</th>
      <th scope="col">${props.price>1?parseFloat(props.price).toFixed(2):parseFloat(props.price).toFixed(6)}</th>
      <th scope="col" style={props.priceChangeH>0?{color:"rgb(41, 150, 41)"}:{color:"rgb(150, 40, 40)"}}>{props.priceChangeH>0?"▲":"▼"} {Math.abs(props.priceChangeH)}</th>
      <th scope="col" style={props.priceChangeD>0?{color:"rgb(41, 150, 41)"}:{color:"rgb(150, 40, 40)"}}>{props.priceChangeD>0?"▲":"▼"} {Math.abs(props.priceChangeD)}</th>
      <th scope="col" style={props.priceChangeW>0?{color:"rgb(41, 150, 41)"}:{color:"rgb(150, 40, 40)"}}>{props.priceChangeW>0?"▲":"▼"} {Math.abs(props.priceChangeW)}</th>
      <th scope="col">{Math.round(props.volume)}</th>
    </tr>
  )
};
