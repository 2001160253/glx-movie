import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.scss";

import "./ChangePassword.scss";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    name: "",
    passwordOld: "",
    passwordNew: "",
    rePasswordNew: "",
  });

  const [info, setInfo] = useState({ infoName: "", infoMail: "" });

  const loginAuthen = JSON.parse(localStorage.getItem("authentication"));
  useEffect(() => {
    setInfo({
      infoName: loginAuthen.Name,
      infoMail: loginAuthen.Email,
    });
  }, []);

  const handleChangeValue = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePass = () => {
    const { email, name, passwordOld, passwordNew, rePasswordNew } = values;
    console.log(values);
    if (passwordOld == "") {
      toast.error("Mật khẩu không được để trống");
      return;
    }
    if (passwordNew == "") {
      toast.error("Mật khẩu không được để trống");
      return;
    }
    if (passwordNew != rePasswordNew) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    } else {
      fetch(
        "https://vietcpq.name.vn/U2FsdGVkX18VmUfb3R34rkA11q59f+dY6kr6oyXqCbg=/user/ChangePassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email: loginAuthen.Email,
            Password: passwordOld,
            PasswordNew: passwordNew,
          }),
        }
      ).then((res) => {
        if (res.status == 404) {
          toast.error("Mật khẩu không chính xác!");
        }
        if (res.status == 200) {
          toast.success("Đổi mật khẩu thành công!");
          setTimeout(() => {
            localStorage.removeItem("authentication");
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
            <h1>Đổi mật khẩu</h1>

            <div className="formLogin">
              <div className="inputContainer">
                <input
                  className="disaB"
                  name="email"
                  type="text"
                  value={info.infoMail}
                  disabled
                />

                <input
                  className="disaB"
                  name="name"
                  type="text"
                  value={info.infoName}
                  disabled
                />

                <div className="containerPassword containerChangePass">
                  <input
                    className="inputChange"
                    name="passwordOld"
                    type="password"
                    placeholder="Mật khẩu cũ"
                    onChange={handleChangeValue}
                  />
                  <input
                    className="inputChange"
                    name="passwordNew"
                    type="password"
                    placeholder="Mật khẩu mới"
                    onChange={handleChangeValue}
                  />

                  <input
                    className="inputChange"
                    name="rePasswordNew"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <button className="btnChangePass" onClick={handleChangePass}>
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
