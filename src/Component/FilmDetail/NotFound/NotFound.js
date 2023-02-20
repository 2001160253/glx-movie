import React from "react";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="notFound">
      <img
        src="https://static.mservice.io/next-js/_next/static/public/cinema/not-found.svg"
        alt="error"
      />
      <h3>Úi, Suất chiếu không tìm thấy.</h3>
      {/* <span>Bạn hãy thử tải lại trang nhé</span> */}
    </div>
  );
}
