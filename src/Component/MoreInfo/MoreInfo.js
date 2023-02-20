import React from "react";
import "./MoreInfo.scss";
import { useEffect, useState } from "react";

export default function MoreInfo() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(
      "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/cinema/moreInfo"
    )
      .then((res) => res.json())
      .then((data) => setInfo(data));
  }, []);

  const fakeImg = [
    "https://cdn.galaxycine.vn/media/2023/1/17/bangqltv-2023-digital-1200x1800_1673940943642.jpg",
    "https://cdn.galaxycine.vn/media/2023/2/6/500_1675669941430.jpg",
    "https://cdn.galaxycine.vn/media/2022/12/10/combo-u22-digital-300x450-1667285239633_1670637604853.jpg",
    "https://cdn.galaxycine.vn/media/2023/1/31/1200x1800-100_1675149392898.jpg",
  ];

  return (
    <div className="info">
      <div className="container">
        <h1>Tin khuyến mãi</h1>
        <div className="imgWrapper">
          {fakeImg.map((item, index) => {
            return (
              <div key={index} className="infoImg">
                <img src={item} alt={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
