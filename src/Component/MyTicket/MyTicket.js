import React, { useEffect, useState } from "react";
import "./MyTicket.scss";
import { FaPlay, FaAngleRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyTicket() {
  const [FilmShowing, setFilmShowing] = useState();
  const nav = useNavigate();
  const [listTicket, setListTicket] = useState();

  const eM = JSON.parse(localStorage.getItem("authentication")).Email;
  useEffect(() => {
    fetch(
      "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/cinema/nowAndSoon"
    )
      .then((res) => res.json())
      .then((data) => setFilmShowing(data.movieShowing));
    fetch(
      `https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/cinema/TicketByEmail/${eM}`
    )
      .then((res) => res.json())
      .then((data) => setListTicket(data));
  }, []);

  return (
    <div className="myTicket">
      <div className="ticketContainer">
        <div className="breadcrumb">
          <a href="/film">Trang chủ</a>
          <FaAngleRight />
          <span>Lịch sử đặt vé</span>
        </div>
        <div className="listMyticket">
          <ul className="headerTb">
            <li className="idTicket">Mã vé</li>
            <li className="nameTicket">Tên phim</li>
            <li className="nameTheater">Tên rạp</li>
            <li className="comboTicket">Combo</li>
            <li className="seatTicket">Ghế ngồi</li>
            <li className="timeTicket">Thời gian</li>
          </ul>
          {listTicket?.map((item, index) => {
            return (
              <ul className="headerTb contentTicket" key={index}>
                <li className="idTicket">{item.Id}</li>
                <li className="nameTicket">{item.FilmName}</li>
                <li className="nameTheater">{item.CinemaName}</li>
                <li className="comboTicket">{item.Combo}</li>
                <li className="seatTicket">{item.SeatCode}</li>
                <li className="timeTicket">
                  <span className="giod">{`${item.ShowTime.substr(
                    11,
                    5
                  )}`}</span>
                  <span>
                    {`${item.ShowTime.substr(8, 2)}/${item.ShowTime.substr(
                      5,
                      2
                    )}/${item.ShowTime.substr(0, 4)}`}
                  </span>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      <div className="tickWFilm">
        <h1>Phim đang chiếu</h1>
        <div className="tickFilm">
          {FilmShowing?.slice(0, 4)?.map((item) => {
            return (
              <div
                className="filmW"
                onClick={() => {
                  nav(`/film/${item.id}`);
                }}
              >
                <img src={item.imageLandscape} alt="pic" />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
