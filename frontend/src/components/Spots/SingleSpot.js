import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import EditForm from "./EditForm";

const SingleSpot = () => {
  const [isformShown, setIsFormShown] = useState(false);
  const { id } = useParams();

  const spot = useSelector((state) => state.spots[id]);
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);

  const handleEdit = () => {
    setIsFormShown((prevState) => !prevState);
  };

  const handleDelete = () => {
    dispatch(deleteSpotThunk(id));
    history.push("/spots");
  };

  if (!spot) {
    return null;
  }

  return (
    <div>
      <h1>{spot.name}</h1>
      <img src="" alt={`${spot.name} property`} />
      <div>
        Address:
        <span> {spot.city}, </span>
        <span>{spot.state}, </span>
        <span>{spot.country}</span>
      </div>
      <div>Price: ${spot.price}</div>
      {user && user.id === spot.userId && (
        <div>
          <button onClick={handleEdit}>Edit</button>{" "}
          <button onClick={handleDelete}>delete</button>
          {isformShown && <EditForm />}
        </div>
      )}
    </div>
  );
};

export default SingleSpot;
