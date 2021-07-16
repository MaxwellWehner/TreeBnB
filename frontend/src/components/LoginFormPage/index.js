import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../store/session";

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

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handelSubmit}>
      {errors.length > 0 && (
        <ul>
          Please fix the following errors
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <label htmlFor="credential ">
        Username or Email:
        <input
          id="credential"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        ></input>
      </label>
      <label htmlFor="password">
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
      </label>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginFormPage;
