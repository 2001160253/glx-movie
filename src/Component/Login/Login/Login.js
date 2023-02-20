import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setpassword(event.target.value);
  };

  const handleLogin = async () => {
    if (email === "") {
      toast.error("Chưa nhập tên tài khoản!");
      return;
    }
    if (password === "") {
      toast.error("Chưa nhập  mật khẩu");
      return;
    } else {
      try {
        const res = await fetch(
          "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/user/Login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: email,
              Password: password,
            }),
          }
        );

        const loginInfo = await res.json();
        console.log(loginInfo.Email, loginInfo.Name);
        if (res.status == 200) {
          toast.success("Đăng nhập thành công!");
          setTimeout(() => {
            localStorage.setItem("authentication", JSON.stringify(loginInfo));

            navigate("/film");
          }, 1000);
        }
      } catch (error) {
        toast.error("Sai thông tin đăng nhập, mời nhập lại");
      }
    }
  };

  return (
    <div>
      <div className="Login">
        <ToastContainer position="top-center" reverseOrder={false} />
        <div className="loginForm">
          <div className="containerForm">
            <h1>Đăng nhập</h1>
            <span className="subTitle">
              Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận
              thêm nhiều ưu đãi từ chương trình thành viên Galaxy Cinema
            </span>
            <div className="formLogin">
              <div className="inputContainer">
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  onChange={handleEmail}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  onChange={handlePassword}
                />
              </div>
              <a href="#" className="forgotPass">
                Quên mật khẩu
              </a>
              <button onClick={handleLogin}>Đăng nhập</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
