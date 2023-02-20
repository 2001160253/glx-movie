import React, { useEffect, useState } from "react";
import "./Home.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MoreInfo from "../MoreInfo/MoreInfo";
import Loading from "../Loading/Loading";
import Loading2 from "../Loading/Loading";
import SliderSwiper from "./Slider/Slider";

import "./Carousel.scss";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemShowing, setItemShowing] = useState(5);
  const [item, setItem] = useState(5);

  useEffect(() => {
    dispatch({ type: "GET_ALL", payload: null });
  }, []);

  const ListFilm = useSelector((state) => state.films);

  const onClickFilmDetail = (filmDetails) => {
    dispatch({ type: "SAVE_MOVIE_DETAIL", payload: filmDetails });
    navigate(`/film/${filmDetails.id}`);
  };

  return (
    <div className="total">
      <div className="sliderWrapper">
        <SliderSwiper />
      </div>
      <div className="Home">
        <div className="Main">
          <div>
            <h1 className="t-cen b fs-55 titleShowing">Phim đang chiếu</h1>
            <div className="filmShowing">
              {ListFilm.showingMovies.length > 0 ? (
                ListFilm.showingMovies?.slice(0, itemShowing).map((film) => {
                  return (
                    <div className="item">
                      <div key={film.id} className="filmShowingCard">
                        <img src={film.imagePortrait} alt="pic" />
                        <div className="overlay"></div>
                        <button
                          className="buyTickets"
                          onClick={() => onClickFilmDetail(film)}
                        >
                          MUA VÉ
                        </button>
                      </div>
                      <h4 className="filmName">{film.name}</h4>
                    </div>
                  );
                })
              ) : (
                <div className="loadWrap" style={{ marginLeft: "600px" }}>
                  {" "}
                  <Loading />
                </div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                className="showMore"
                onClick={() => {
                  setItemShowing(itemShowing + 5);
                }}
              >
                Xem thêm
              </button>
            </div>
          </div>
          <div>
            <h1 className="t-cen b fs-55 titleShowing">Phim sắp chiếu</h1>
            <div className="filmShowing">
              {ListFilm.comingMovies.length > 0 ? (
                ListFilm.comingMovies?.slice(0, item).map((film) => {
                  return (
                    <div>
                      <div key={film.id} className="filmShowingCard">
                        <img src={film.imagePortrait} alt="blo" />
                        <div className="overlay"></div>
                        <button
                          className="buyTickets"
                          onClick={() => onClickFilmDetail(film)}
                        >
                          MUA VÉ
                        </button>
                      </div>
                      <h4 className="filmName">{film.name}</h4>
                    </div>
                  );
                })
              ) : (
                <div style={{ marginLeft: "600px" }}>
                  {" "}
                  <Loading2 />
                </div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                className="showMore"
                onClick={() => {
                  setItem(item + 5);
                }}
              >
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      <MoreInfo />
    </div>
  );
}
