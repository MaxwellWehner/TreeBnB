import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, getSpots } from "../../store/spots";
import { useParams } from "react-router-dom";

const SingleSpot = () => {
  const { id } = useParams();

  const spot = useSelector((state) => state.spots[id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch]);

  if (!spot) {
    return null;
  }

  return (
    <div>
      {console.log(spot)}
      <h1>{spot.name}</h1>
      <img src="" alt={`${spot.name} property`} />
      <div>
        Address:
        <span> {spot.city}, </span>
        <span>{spot.state}, </span>
        <span>{spot.country}</span>
      </div>
      <div>Price: ${spot.price}</div>
    </div>
  );
};

export default SingleSpot;
