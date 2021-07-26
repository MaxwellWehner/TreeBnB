import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getUserBookings, removeBookings } from "../../store/bookings";
import { getSpots } from "../../store/spots";

function MyBookings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => Object.values(state.bookings));
  const spots = useSelector((state) => {
    return state.spots;
  });

  useEffect(() => {
    dispatch(removeBookings());
    dispatch(getUserBookings(userId));
    dispatch(getSpots());
  }, [dispatch, userId]);

  const handleSingleSpot = (spot) => {
    history.push(`/spots/${spot.id}`);
  };

  if (!sessionUser) return <Redirect to="/login" />;

  return (
    <div className="spots__container">
      {bookings &&
        spots &&
        bookings.map((booking) => {
          return (
            <div className="spot__container" key={booking.id}>
              <img
                className="first-image"
                src={spots[booking.spotId].Images[0].url}
                alt="treehouse property"
                onClick={() => handleSingleSpot(spots[booking.spotId])}
              />
              <div className="text-info__container">
                <h2 className="spot__name">{spots[booking.spotId].name}</h2>
                <div className="address">
                  Address:
                  <span> {spots[booking.spotId].city}, </span>
                  <span>{spots[booking.spotId].state}, </span>
                  <span>{spots[booking.spotId].country}</span>
                </div>
                <div className="spot__price">
                  Price: ${spots[booking.spotId].price}/night
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MyBookings;
