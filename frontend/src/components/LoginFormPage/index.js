import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../store/session";
import "./LoginForm.css";

const LoginFormPage = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const user = {
      credential,
      password,
    };

    try {
      await dispatch(login(user));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const handleDemo = async () => {
    setErrors([]);
    const user = {
      credential: "Demo-lition",
      password: "password",
    };

    try {
      await dispatch(login(user));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form__container">
      <form onSubmit={handelSubmit} className="login__form">
        {errors.length > 0 && (
          <ul className="errors">
            Please fix the following errors:
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <label htmlFor="credential ">Username or Email:</label>
        <input
          id="credential"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button type="submit" className="submit">
          Log In
        </button>
      </form>
      <button onClick={handleDemo}>Demo User</button>
    </div>
  );
};

export default LoginFormPage;
