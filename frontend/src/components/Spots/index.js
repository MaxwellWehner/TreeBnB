import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Spots = () => {
  let spots = useSelector((state) => {
    const spotsObj = state.spots;
    const values = Object.values(spotsObj);
    return values;
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const handleSingleSpot = (spot) => {
    history.push(`/spots/${spot.id}`);
  };

  if (!spots) {
    return null;
  }

  return (
    <div className="spots__container">
      {console.log(spots)}
      {spots &&
        spots.map((spot) => {
          return (
            <div className="spot_container" key={spot.id}>
              <h2>{spot.name}</h2>
              <img
                src=""
                alt="treehouse property"
                onClick={() => handleSingleSpot(spot)}
              />
              <div className="address">
                Address:
                <span> {spot.city}, </span>
                <span>{spot.state}, </span>
                <span>{spot.country}</span>
              </div>
              <div>Price: ${spot.price}/night</div>
            </div>
          );
        })}
    </div>
  );
};

export default Spots;
