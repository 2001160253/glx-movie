import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import "./Cinema.scss";

export default function Cinema() {
  const dispatch = useDispatch();
  const [listCinema, setListCinema] = useState([]);
  const [Films, setFilms] = useState([]);
  const [showTime, setShowTime] = useState([]);
  const nav = useNavigate();

  //trung
  useEffect(() => {
    fetch(
      "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/cinema/cinemas"
    )
      .then((res) => res.json())
      .then((data) => setListCinema(data));
  }, []);

  const getFilm = (idCinema) => {
    fetch(
      `https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/cinemas/${idCinema}`
    )
      .then((res) => res.json())
      .then((data) => setFilms(data));
  };

  const getShowTimeByFilmID = (idFilm) => {
    const schedule = Films.find((item) => item.id == idFilm);
    setShowTime(schedule);
  };

  return (
    <div id="cinema">
      <div className="container">
        <ul className="cinema">
          <h3 className="title">CHỌN RẠP</h3>
          {listCinema && listCinema.length > 0 ? (
            listCinema.map((item, index) => {
              return (
                <li
                  key={index}
                  className="cinemaItem"
                  onClick={() => {
                    getFilm(item.code);
                  }}
                >
                  <span>{item.name}</span>
                </li>
              );
            })
          ) : (
            <div className="loaderWrapper">
              <Loading />
            </div>
          )}
        </ul>
        <ul className="film">
          <h3 className="title">CHỌN PHIM</h3>
          {Films.length > 0 ? (
            <>
              {Films.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="filmItem"
                    onClick={() => {
                      getShowTimeByFilmID(item.id);
                    }}
                  >
                    <img src={item.imageLandscape} alt={item.slug} />
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </>
          ) : (
            <div style={{ border: "1px solid #ddd", padding: "10px" }}>
              Hiện chưa có lịch chiếu
            </div>
          )}
        </ul>
        <ul className="showTime">
          <h3 className="title">CHỌN SUẤT</h3>
          {showTime.dates && showTime.dates?.length > 0 ? (
            showTime.dates?.map((item, index) => {
              return (
                <div className="showTimeWrapper" key={index}>
                  <div className="dateWrapper">
                    <div className="dayOfWeekLabel">{item.dayOfWeekLabel}</div>,
                    <div className="showDate">{item.showDate}</div>
                  </div>
                  {item.bundles?.map((item2, index) => {
                    return (
                      <div className="bundlesWrapper" key={index}>
                        <div className="versionWrapper">
                          {" "}
                          <span>{item2.version}</span>-
                          <span>{item2.caption ? "Phụ đề:" : ""}</span>
                        </div>
                        <div className="sessionsWrapper">
                          {item2.sessions?.map((item3, index) => {
                            return (
                              <div key={index}>
                                <button>{item3.showTime}</button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div style={{ border: "1px solid #ddd", padding: "10px" }}>
              Vui lòng chọn suất
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
