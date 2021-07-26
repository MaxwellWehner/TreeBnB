import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className="login__button nav__button">
          Log In
        </NavLink>
        <NavLink to="/signup" className="signup__button nav__button">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div className="nav__container">
      <NavLink exact to="/" className="home__button nav__button">
        TreeBnB
      </NavLink>
      <NavLink to="/spots/create" className="host__button nav__button">
        Host A Spot
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
