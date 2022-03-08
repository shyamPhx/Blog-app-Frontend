import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://explorer-thiru.herokuapp.com/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <>
    <div className="login">
      <span className="loginTitle">LOGIN</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter Your Username"
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter Your Password"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <p style={{ margin: "1em", fontSize: "1rem" }}>Sample Login - Username: stark , Password: 123456</p>
    </div>
      </>
    
  );
}
