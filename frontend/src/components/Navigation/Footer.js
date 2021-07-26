import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer__container">
      <a href="https://github.com/MaxwellWehner">
        <i className="fab fa-github fa-2x"></i>
      </a>
      <a
        className="linkToGiTHub"
        href="https://github.com/MaxwellWehner/TreeBnB"
      >
        <img className="aboutLink-img" src="/tree-house.svg"></img>
      </a>
    </div>
  );
}

export default Footer;
