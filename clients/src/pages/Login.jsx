import { useState } from "react";
import Swal from "sweetalert2";
import instance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSlice } from "../store/loginSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(loginSlice(loginForm, navigate));
  };
  return (
    <>
      {/* Login */}
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#f59e0b", height: "100vh" }}
      >
        <div className="border w-75 p-5 my-5 bg-white rounded-3 shadow">
          <div className="row">
            <div className="col-6">
              <img
                src="./assets/undraw_Online_learning_re_qw08.png"
                alt="login-img"
                width="100%"
              />
            </div>
            <div className="col-6 align-self-center">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <img
                    src="./assets/hacktiv8-logo.png"
                    alt="logo-h8"
                    className="mb-4"
                    width="200px"
                  />
                  <h5 className="mb-4">Sign in to your account</h5>
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    autoComplete="off"
                    name="email"
                    value={loginForm.email}
                    onChange={changeHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={changeHandler}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Login */}
    </>
  );
}
