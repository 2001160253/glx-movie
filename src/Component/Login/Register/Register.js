import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.scss";
import "./Register.scss";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    rePassword: "",
  });
  const [errorValid, setErrorValid] = useState({
    errorMail: "",
    errorName: "",
    errorPass: "",
    errorRePass: "",
  });
  const handleChangeValue = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleRegister = () => {
    const { email, name, password, rePassword } = values;
    if (email == "") {
      toast.error("Email không được để trống");
      return;
    }
    if (name == "") {
      toast.error("Tên không được để trống");
      return;
    }
    if (password == "") {
      toast.error("Mật khẩu không được để trống");
      return;
    }
    if (password != rePassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    } else {
      fetch(
        "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/user/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email: email,
            Name: name,
            Password: password,
            Role: "user",
          }),
        }
      ).then((res) => {
        if (res.status == 404) {
          toast.error("Đăng ký không thành công!");
        }
        if (res.status == 200) {
          toast.success("Đăng ký thành công!");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      });
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="Login">
        <div className="loginForm">
          <div className="containerForm">
            <h1>Đăng ký</h1>
            <span className="subTitle">
              Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận
              thêm nhiều ưu đãi từ chương trình thành viên Galaxy Cinema
            </span>
            <div className="formLogin">
              <div className="inputContainer">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChangeValue}
                />

                <input
                  name="name"
                  type="text"
                  placeholder="Tên đăng nhập"
                  onChange={handleChangeValue}
                />

                <div className="containerPassword">
                  <input
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={handleChangeValue}
                  />

                  <input
                    name="rePassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
              <a href="#" className="forgotPass">
                Quên mật khẩu
              </a>
              <button onClick={handleRegister}>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
