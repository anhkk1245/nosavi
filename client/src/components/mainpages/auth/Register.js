import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: 0,
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Đăng ký</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Tên"
          value={user.name}
          onChange={onChangeInput}
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          name="phone"
          required
          autoComplete="on"
          placeholder="Số điện thoại"
          value={user.phone}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Mật khẩu"
          value={user.email}
          onChange={onChangeInput}
        />

        <select name="role" value={user.role} onChange={onChangeInput}>
          <option value={0}>Người mua</option>
          <option value={1}>Người bán</option>
        </select>

        <div className="row">
          <button type="submit">Đăng ký</button>
          <Link to="/login">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
