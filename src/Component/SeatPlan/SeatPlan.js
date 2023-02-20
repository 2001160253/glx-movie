import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SeatPlan.css";
import _clone from "lodash/clone";
import _find from "lodash/find";
import _remove from "lodash/remove";

export default function PlanSeat(props) {
  const [plan, setPlan] = useState({});
  const [ticket, setTicket] = useState([]);
  const [seatSelected, setSeatSelected] = useState([]);

  useEffect(() => {
    if (
      props.booking &&
      props.booking.seatPlan &&
      props.booking.seatPlan.seatLayoutData
    ) {
      setPlan(props.booking.seatPlan.seatLayoutData);
    }
    if (props.booking && props.booking.ticket) {
      setTicket(props.booking.ticket);
    }
  }, [props.booking]);

  const handleSeatSelection = (indexArea, indexRow, indexSeat) => {
    let clonePlan = _clone(plan);

    let seat = clonePlan.areas[indexArea].rows[indexRow].seats[indexSeat];
    let row = clonePlan.areas[indexArea].rows[indexRow];

    if (!seat.selected) {
      clonePlan.areas[indexArea].rows[indexRow].seats[
        indexSeat
      ].selected = true;

      seat.name = row.physicalName + indexSeat; // TRONG DATA SERVER KHÔNG CÓ TÊN GHẾ => TỰ THÊM   ('A + 22')
      seat.areaCategoryCode = clonePlan.areas[indexArea].areaCategoryCode; // TRONG DATA SEAT ĐÃ ĐI QUÁ XA THÔNG TIN TRONG AREA // BỎ THÊM ĐỂ TIỆN XỬ LÝ

      let seatSelectedClone = seatSelected;
      seatSelectedClone.push(seat); // THÊM VÀO MẢNG GHẾ ĐANG CHỌN
      setSeatSelected(seatSelectedClone);
      setPlan(clonePlan);

      props.passSelectedSeat(seatSelectedClone); // ĐẨY MẢNG GHẾ ĐANG CHỌN VỀ TRANG CHA BOOKING TICKET
      return;
    }
    if (seat.selected) {
      clonePlan.areas[indexArea].rows[indexRow].seats[
        indexSeat
      ].selected = false;
      setPlan(clonePlan);

      let seatSelectedClone = seatSelected;
      _remove(seatSelectedClone, function (n) {
        return n.position == seat.position;
      });
      // XOÁ GHẾ ĐANG CHỌN
      setSeatSelected(seatSelectedClone);
      props.passSelectedSeat(seatSelectedClone); // ĐẨY MẢNG GHẾ ĐANG CHỌN VỀ TRANG CHA BOOKING TICKET
      return;
    }
  };
  const renderSeat = (seat, indexArea, indexRow, indexSeat) => {
    if (seat.status == 0) {
      // STATUS 0: CHƯA BÁN
      return (
        <div
          key={indexSeat}
          className={seat.selected ? "number seat-selected" : "number"}
          onClick={() => handleSeatSelection(indexArea, indexRow, indexSeat)}
        >
          <span>{seat.id}</span>
        </div>
      );
    }
    if (seat.status == 1) {
      // STATUS 1: ĐÃ BÁN
      return (
        <div key={indexSeat} className="number seat-buyed">
          <span>{seat.id}</span>
        </div>
      );
    }
  };
  return (
    <div className="seatWrapper">
      <div className="display">
        <h3 className="Name">Đặt vé</h3>
        <div className="styleSeat">
          <p>
            <span style={{ background: "grey" }}></span>
            Ghế có thể chọn
          </p>
          <p>
            <span style={{ background: "aqua" }}></span>
            Ghế đã chọn
          </p>
          <p>
            <span style={{ background: "lightgreen" }}></span>
            Ghế đang chọn
          </p>
          <p>
            <span style={{ background: "red" }}></span>
            Ghế đã bán
          </p>
        </div>
      </div>
      {plan.areas && plan.areas.length > 0
        ? plan.areas.map((n, indexArea) => {
            return (
              <Fragment className="listSeatWrapper" key={indexArea}>
                {n.rows.length > 0
                  ? n.rows.map((r, indexRow) => {
                      return (
                        <div className="listSeat" key={indexRow}>
                          <span>{r.physicalName}</span>
                          <div className="body-seats d-flex justify-content-between">
                            {r.seats.length > 0
                              ? r.seats.map((seat, indexSeat) => {
                                  return renderSeat(
                                    seat,
                                    indexArea,
                                    indexRow,
                                    indexSeat
                                  );
                                })
                              : ""}
                          </div>
                          <span>{r.physicalName}</span>
                        </div>
                      );
                    })
                  : ""}
              </Fragment>
            );
          })
        : ""}
    </div>
  );
}
