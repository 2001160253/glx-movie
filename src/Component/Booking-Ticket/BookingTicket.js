import "./BookingTicket.scss";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import FoodAndTick from "../FoodAndTick/FoodAndTick";
import SeatPlan from "../SeatPlan/SeatPlan";
import PayBankCard from "../PayBankCard/PayBankCard";
import _cloneDeep from "lodash/cloneDeep";
import _clone from "lodash/clone";
import Swal from "sweetalert2";
import _find from "lodash/find";

export default function BookingTicket() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPriceFoodAndTicket, setTotalPriceFoodAndTicket] = useState(0);
  const [booking, setBooking] = useState({});
  const [seatSelected, setSeatSelected] = useState([]);
  const [foodSelected, setFoodSelected] = useState([]);

  const [cinemaInfo, setCinemaInfo] = useState();
  const [movieInfo, setMovieInfo] = useState();

  useEffect(() => {
    fetch("https://teachingserver.onrender.com/cinema/booking/detail")
      .then((res) => res.json())
      .then((data) => {
        setBooking(data);
      });
    setCinemaInfo(JSON.parse(localStorage.getItem("theater")));
    setMovieInfo(JSON.parse(localStorage.getItem("movieDetail")));
  }, []);

  useEffect(() => {}, [seatSelected]);

  const catchSelectedSeat = (seats) => {
    setSeatSelected(_clone(seats));
  };

  const catchPassSelectedFood = (foodSelected) => {
    setFoodSelected(foodSelected);
  };

  const changeCurrentPage = (key) => {
    let currentPageClone = currentPage;
    if (key === "NEXT" && currentPageClone < 2) {
      if (seatSelected.length == 0) {
        Swal.fire({
          icon: "error",
          title: "Bạn chưa chọn ghế",
          text: "Mời bạn chọn để tiếp tục!",
        });
        return;
      }
      setCurrentPage((currentPageClone += 1));
    }
    if (key === "BACK") {
      setCurrentPage((currentPageClone -= 1));
    }
  };
  const renderNameSeatSelected = () => {
    if (seatSelected.length > 0) {
      let name = "";
      seatSelected.map((seat) => {
        name += seat.name + " ";
      });
      localStorage.setItem("seat", JSON.stringify({ name }));
      return name;
    }
    return "Chưa chọn";
  };
  const renderNameFoodSelected = () => {
    if (foodSelected.length > 0) {
      let name = "";
      foodSelected.map((food) => {
        if (food.defaultQuantity) {
          name += food.description + " ";
        }
      });
      localStorage.setItem("combo", JSON.stringify({ name }));
      return name;
    }
    return "Chưa chọn";
  };
  const renderTotalMoney = () => {
    let total = 0;
    if (seatSelected.length > 0) {
      seatSelected.map((seat) => {
        let infoTiket = _find(booking.ticket, function (o) {
          return o.areaCategoryCode == seat.areaCategoryCode;
        });
        total += infoTiket.displayPrice;
      });
    }

    if (foodSelected.length > 0) {
      foodSelected.map((food) => {
        total += food.defaultQuantity * food.displayPrice;
      });
    }
    localStorage.setItem("price", JSON.stringify(total));

    return total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="bookingTicket">
      <div className="w-100 row mt-5 bookingTicket">
        <div
          className={currentPage === 0 ? "col-9 display-block" : "display-none"}
        >
          <div className="contentWrapper">
            <SeatPlan
              booking={booking}
              passSelectedSeat={(seat) => {
                catchSelectedSeat(seat);
              }}
            />
          </div>
        </div>
        <div
          className={
            currentPage === 1 ? "content col-9 display-block" : "display-none"
          }
        >
          <FoodAndTick
            booking={booking}
            total={totalPriceFoodAndTicket}
            passSelectedFood={(food) => {
              catchPassSelectedFood(food);
            }}
          />
        </div>
        <div
          className={currentPage === 2 ? "col-9 display-block" : "display-none"}
        >
          <PayBankCard />
        </div>
        <div className="col-3">
          <div className="card ">
            <div className="card-body">
              <p>Thông tin phim</p>
              <img src={movieInfo?.imageLandscape} alt="pic" />
              <b className="nameMovie">{movieInfo?.name}</b>
              <p className="rap">
                Rạp: <span>{cinemaInfo?.name}</span>
              </p>
              <p className="showTime rap">
                Suất chiếu:{" "}
                <span>{JSON.parse(localStorage.getItem("showTime"))}</span>
                <span className="de"></span>
                <span>{JSON.parse(localStorage.getItem("showDate"))}</span>
              </p>
              <p className="rap">
                Ghế đã chọn: <span>{renderNameSeatSelected()}</span>
              </p>
              <p className="rap">
                Combo: <span>{renderNameFoodSelected()}</span>
              </p>
              <p className="rap totalRap">
                Tổng cộng: <span className="fw-bold">{renderTotalMoney()}</span>
              </p>

              <div className="text-end mt-3">
                {/* khi index = 1 thì tắt nút quay lại */}
                {currentPage >= 1 ? (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      changeCurrentPage("BACK");
                    }}
                  >
                    Quay lại
                  </button>
                ) : null}
                <button
                  type="button"
                  className="btn btnConti"
                  onClick={() => {
                    changeCurrentPage("NEXT");
                  }}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
