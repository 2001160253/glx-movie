import React from "react";
import useState from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaStamp } from "react-icons/fa";

const Header = (img) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAuthen = JSON.parse(localStorage.getItem("authentication"));

  return (
    <div className="body headerPage">
      <div className="headerPageContainer container-fluid">
        <div className="logo">
          <a href="/">
            <img
              alt="logoImg"
              src={"https://www.galaxycine.vn/website/images/galaxy-logo.png"}
            />
          </a>
        </div>
        <input
          id="searchFilm"
          type="text"
          placeholder="Tìm tên phim, diễn viên"
        />
        {loginAuthen ? (
          <div className="log">
            <div className="info">
              <FaStamp />
              <span>{loginAuthen.Email}</span>
            </div>
            <div className="subLogin">
              <ul>
                <li
                  onClick={() => {
                    navigate("/myticket");
                  }}
                >
                  Giao dịch của tôi
                </li>
                <li
                  onClick={() => {
                    navigate("/changepassword");
                  }}
                >
                  Đổi mật khẩu
                </li>
                <li
                  onClick={() => {
                    localStorage.removeItem("authentication");
                    navigate("/");
                  }}
                >
                  Đăng xuất
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="d-flex login">
            <span
              className="btnLogin btn-login"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </span>
            <span className="btnLogin" onClick={() => navigate("/register")}>
              Đăng ký
            </span>
          </div>
        )}
      </div>
      <div id="menu">
        <div className="container-fluid">
          <ul>
            <li>
              <a href="/cinema">MUA VÉ</a>
            </li>
            <li>
              <a href="/film">PHIM</a>
            </li>

            <li>
              <a href="/SystemCinema">RẠP/GIÁ VÉ</a>
            </li>
            <li>
              <a className="noneHover" href="#">
                GÓC ĐIỆN ẢNH
              </a>
            </li>
            <li>
              <a className="noneHover" href="#">
                SỰ KIỆN
              </a>
            </li>
            <li>
              <a className="noneHover" href="#">
                HỖ TRỢ
              </a>
            </li>
            <li>
              <a className="noneHover" href="#">
                THÀNH VIÊN
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
