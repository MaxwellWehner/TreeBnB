import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import { removeBookings } from "../../store/bookings";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
		e.preventDefault();
		await dispatch(sessionActions.logout());
		await dispatch(removeBookings(user.id));
		history.push("/");
  };

  const handleBookings = (e) => {
    e.preventDefault();
    history.push(`/${user.id}/bookings`);
  };

    const handleYourSpots = (e) => {
		e.preventDefault();
		history.push(`/your-spots`);
	};

	return (
		<>
			<button onClick={openMenu} className="nav__button profile__button">
				<i className="fas fa-user-circle" />
				{user.username}
			</button>
			{showMenu && (
				<ul className="profile-dropdown">
					<li>
						<span>Username: </span>
						{user.username}
					</li>
					<li>
						<span>Email: </span>
						{user.email}
					</li>
					<li>
						<button
							onClick={handleBookings}
							className="nav__button my-bookings__button"
						>
							Your Bookings
						</button>
					</li>
					<li>
						<button
							onClick={handleYourSpots}
							className="nav__button my-bookings__button"
						>
							Your Spots
						</button>
					</li>
					<li>
						<button
							onClick={logout}
							className="nav__button logout__button"
						>
							Log Out
						</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
