import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import _clone from "lodash/clone";
import "./FoodAndTick.css";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

export default function FoodAndTick(props) {
  const [consession, setConsession] = useState([]);

  useEffect(() => {
    if (
      props.booking &&
      props.booking.consession &&
      props.booking.consession.length > 0
    ) {
      setConsession(props.booking.consession[0].concessionItems);
    }
  }, [props.booking]);

  const minusQuantityConsession = (index) => {
    let consessions = _clone(consession);
    if (consessions[index].defaultQuantity == 0) {
      return;
    }
    consessions[index].defaultQuantity -= 1;
    props.passSelectedFood(consessions);
    setConsession(consessions);
  };
  const addQuantityConsession = (index) => {
    let consessions = _clone(consession);
    if (consessions[index].defaultQuantity == 19) {
      return;
    }
    consessions[index].defaultQuantity += 1;
    props.passSelectedFood(consessions);
    setConsession(consessions);
  };

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <h3 className="title fw-bold">Danh sách combo</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-start" scope="col">
                  #
                </th>
                <th className="text-start" scope="col">
                  Hình ảnh
                </th>
                <th className="text-center" scope="col">
                  Số lượng
                </th>
                <th className="text-center" scope="col">
                  Giá (VNĐ)
                </th>
                <th className="text-end" scope="col">
                  Tổng (VNĐ)
                </th>
              </tr>
            </thead>
            <tbody>
              {consession && consession.length > 0 ? (
                consession.map((consess, i) => {
                  return (
                    <tr key={i} className="py-3">
                      <th scope="row" className="imgBap">
                        <img src={consess.imageUrl} alt="" className="" />
                      </th>
                      <th scope="row" className="film-name">
                        {" "}
                        <span className="fw-normal">
                          {consess.description} {consess.extendedDescription}{" "}
                        </span>
                      </th>
                      <th scope="row text-center">
                        <div className="group-add-minus d-flex justify-content-between align-items-center">
                          <div
                            className="icon mx-4"
                            onClick={() => minusQuantityConsession(i)}
                            style={{ cursor: "pointer" }}
                          >
                            <FaMinusCircle />
                          </div>
                          <input
                            disabled
                            className="input-group-field form-control"
                            type="number"
                            min="1"
                            value={consess.defaultQuantity}
                          />
                          <div
                            className="icon mx-4"
                            onClick={() => addQuantityConsession(i)}
                            style={{ cursor: "pointer" }}
                          >
                            <FaPlusCircle />
                          </div>
                        </div>
                      </th>
                      <th scope="row" className="film-price text-center">
                        <span className="fw-normal">
                          {consess.displayPrice}
                        </span>
                      </th>
                      <th scope="row" className="film-price text-end">
                        <span>
                          {consess.defaultQuantity * consess.displayPrice}
                        </span>
                      </th>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th scope="row" className="film-price text-end">
                    Chưa có dữ liệu
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
