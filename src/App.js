import React, { useState, useEffect } from "react";
import CryptoCard from "./components/CryptoCard";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=3")
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <div className="row mb-4 header">
        <div className="col-12 text-center page-title">
          <h1>Crypto Rankings</h1>
          <p>Top three</p>
        </div>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=eduardconstantin&repo=Crypto-Rankings&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="120"
          height="30"
          title="GitHub"
          className="github-stars"
        ></iframe>
      </div>
      <div className="row">
        {data?.coins.map((item) => (
          <div key={item.id} className="col-lg-4 col-xs-12 mb-5 crypto-card">
            <CryptoCard
              key={item.id}
              coinID={item.id}
              title={item.name}
              symbol={item.symbol}
              image={item.icon}
              price={item.price}
              aSupply={item.availableSupply}
              tSupply={item.totalSupply}
              priceChangeH={item.priceChange1h}
              priceChangeD={item.priceChange1d}
              priceChangeW={item.priceChange1w}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
