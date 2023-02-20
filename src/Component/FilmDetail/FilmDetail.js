import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./FilmDetail.scss";
import "./Modal.scss";

import { FaPlay, FaAngleRight, FaStar } from "react-icons/fa";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NotFound from "./NotFound/NotFound";
import Loading from "../Loading/Loading";

const FilmDetail = () => {
  const { id } = useParams();
  const [MovieDetail, setMovieDetail] = useState([]);
  const [Cinema, setCinema] = useState([]);
  const [MovieCommingSoon, setMovieCommingSoon] = useState([]);
  const [movieShowing, setMovieShowing] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isActive, setIsActive] = useState();
  const nav = useNavigate();

  const [date, setDate] = useState();

  useEffect(() => {
    fetch(
      "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/cinema/nowAndSoon"
    )
      .then((res) => res.json())
      .then((data) => {
        let totalMovie = [...data.movieShowing, ...data.movieCommingSoon];
        let filmDetails = totalMovie.find((film) => film.id == id);
        setMovieDetail(filmDetails);
        setMovieCommingSoon(data.movieCommingSoon);
        setMovieShowing(data.movieShowing);
      });

    fetch("https://teachingserver.onrender.com/cinema/movie/" + id)
      .then((res) => res.json())
      .then((data) => {
        setCinema(data);
      });
  }, [id]);

  const authen = JSON.parse(localStorage.getItem("authentication"));

  const handleClickRelated = (id) => {
    nav(`/film/${id}`);
  };

  const handleBuyTicket = (cinema) => {
    authen ? nav(`/bookingandticket/${cinema.id}`) : nav("/login");
    localStorage.setItem("theater", JSON.stringify(cinema));
    localStorage.setItem("movieDetail", JSON.stringify(MovieDetail));
  };

  const [listNameCinema, setListNameCinema] = useState([]);
  useEffect(() => {
    fetch(
      "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/cinema/cinemas"
    )
      .then((res) => res.json())
      .then((data) => setListNameCinema(data));
  }, []);

  const [slugCinema, SetSLugCinema] = useState("");
  const handleChange = (event) => {
    if (event.target.value == "tat-ca") {
      SetSLugCinema("");
    } else {
      SetSLugCinema(event.target.value);
    }
  };

  return (
    <div className="DetailContainer">
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>{MovieDetail.name}</Modal.Header>

          <div className="trailerContainer">
            <iframe
              width={"100%"}
              height={"100%"}
              src={MovieDetail?.trailer?.replace("watch?v=", "embed/")}
            ></iframe>
          </div>
        </Modal>
      </>
      <div className="breadcrumb">
        <a href="/film">Trang chủ</a>
        <FaAngleRight />
        <a href="/cinema">Đặt vé</a>
        <FaAngleRight />
        <span>{MovieDetail.name}</span>
      </div>
      <div className="row">
        <div className="container">
          <div className="detailFilm col-md-8">
            <div className="row1">
              <div className="container">
                <div className="col-md-4 filmImg">
                  <div className="FilmCard">
                    <img
                      src={MovieDetail && MovieDetail.imagePortrait}
                      alt="pic"
                    />
                    <Button
                      className="btnModal"
                      variant="primary"
                      onClick={handleShow}
                    >
                      <FaPlay />
                    </Button>
                  </div>
                </div>
                <div className="col-md-8 filmInfo">
                  <h4 className="">{MovieDetail && MovieDetail.name}</h4>
                  <div className="rateWrapper">
                    <FaStar />
                    <div className="point">
                      <span>{MovieDetail?.point?.toFixed(1)}</span>/10
                    </div>
                  </div>
                  <div className="productionWrapper">
                    <p className="production">
                      Nhà sản xuất :<span>Marvel studios</span>
                    </p>
                    <p className="production">
                      Quốc gia :<span>Mỹ</span>
                    </p>
                    <p className="production">
                      Thể loại:<span>Hành động</span>
                    </p>
                    <p className="production">
                      Diễn viên :
                      <span>
                        Evangeline Lilly, Evangeline Lilly, Evangeline Lilly,
                        Evangeline Lilly, Evangeline Lilly
                      </span>
                    </p>
                    <p className="production">
                      Đạo diễn:<span>Hành động</span>
                    </p>
                    <p className="production">
                      Ngày khởi chiếu:<span>13/11/2023</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="title">NỘI dung phim</div>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: MovieDetail && MovieDetail.description,
                }}
              />
            </div>
            <div>
              <div className="title">LỊCH CHIẾU</div>
              <div className="filter">
                <div className="filterByTheater">
                  <select id="optionsCinema" onChange={handleChange}>
                    <option value="tat-ca">Tất cả</option>
                    {listNameCinema && listNameCinema.length > 0
                      ? listNameCinema?.map((item, index) => {
                          return (
                            <option key={index} value={item.slug}>
                              {item.name}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                </div>

                {/* <div className="filterByDate">
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <span>{date.customFormat("dd/mm/yyyy")}</span> */}
              </div>

              {Cinema && Cinema.length > 0 ? (
                Cinema.filter((item) => item.slug.includes(slugCinema))?.map(
                  (cinema, index) => {
                    return (
                      <div className="showTimeWrraper" key={index}>
                        <div className="CardCinema">
                          <div className="CinemaAll">{cinema.name}</div>
                          <div className="Date">
                            {cinema.dates.map((itemDate) => {
                              return itemDate.bundles.map((bundles) => {
                                return (
                                  <div className="bunWrapper">
                                    <div className="labelThu">
                                      <span>{itemDate.dayOfWeekLabel}</span>,
                                      <span>{itemDate.showDate}</span>
                                    </div>
                                    <div className="CardVersion">
                                      <div className="version">
                                        <p>
                                          {" "}
                                          {bundles.version} -{" "}
                                          {bundles.caption ? "Phụ đề" : ""}
                                        </p>
                                      </div>
                                      <div className="cardshowTime">
                                        {bundles.sessions.map((sessions) => {
                                          return (
                                            <div
                                              className="showTime"
                                              onClick={() => {
                                                handleBuyTicket(cinema);
                                                localStorage.setItem(
                                                  "showTime",
                                                  JSON.stringify(
                                                    sessions.showTime
                                                  )
                                                );
                                                localStorage.setItem(
                                                  "showDate",
                                                  JSON.stringify(
                                                    sessions.showDate
                                                  )
                                                );
                                              }}
                                            >
                                              <div className="BodershowTime">
                                                <p>{sessions.showTime}</p>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                );
                              });
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
              ) : (
                <NotFound />
              )}
            </div>
          </div>
          <div className="detailDiscount col-md-4">
            <div className="colRightWrapper">
              <div className="discount">
                <div className="title">Nhận khuyến mãi</div>
                <div className="discountContainer">
                  <input type="text" placeholder="Email" />
                  <button>Đăng ký</button>
                </div>
              </div>
              <div className="filmShowing">
                <div className="title">Phim đang chiếu</div>
                <div className="containerFilmShowing">
                  {movieShowing && movieShowing.length > 0
                    ? movieShowing?.slice(0, 3)?.map((item, index) => {
                        if (item.id !== id) {
                          return (
                            <div
                              className="relateMovie"
                              key={index}
                              onClick={() => {
                                handleClickRelated(item.id);
                              }}
                            >
                              <img
                                src={item.imageLandscape}
                                alt={item.imageLandscape}
                              />
                              <span> {item.name}</span>
                            </div>
                          );
                        }
                      })
                    : ""}
                </div>

                <button
                  className="btnShowAll"
                  onClick={() => {
                    nav("/film");
                  }}
                >
                  Xem thêm{" "}
                  <span>
                    <FaAngleRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
