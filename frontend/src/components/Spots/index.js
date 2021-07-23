import { getSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Spots.css";

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
      {spots &&
        spots.map((spot) => {
          return (
            <div className="spot__container" key={spot.id}>
              <img
                className="first-image"
                src={spot.Images[0].url}
                alt="treehouse property"
                onClick={() => handleSingleSpot(spot)}
              />
              <div className="text-info__container">
                <h2 className="spot__name">{spot.name}</h2>
                <div className="address">
                  Address:
                  <span> {spot.city}, </span>
                  <span>{spot.state}, </span>
                  <span>{spot.country}</span>
                </div>
                <div className="spot__price">Price: ${spot.price}/night</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Spots;
