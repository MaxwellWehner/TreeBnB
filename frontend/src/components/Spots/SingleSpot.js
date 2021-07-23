import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import EditForm from "./EditForm";

const SingleSpot = () => {
  const { id } = useParams();

  const spot = useSelector((state) => state.spots[id]);
  const user = useSelector((state) => state.session.user);

  const [isformShown, setIsFormShown] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);

  const formShow = () => {
    setIsFormShown((prevState) => !prevState);
  };

  const handleEdit = () => {
    setIsFormShown((prevState) => !prevState);
  };

  const handleDelete = () => {
    dispatch(deleteSpotThunk(id));
    history.push("/spots");
  };

  const prevImg = () => {
    const length = spot.Images.length;
    if (currentImageIdx === 0) {
      setCurrentImageIdx(length);
    }
    setCurrentImageIdx((prevSate) => prevSate - 1);
  };

  const nextImg = () => {
    const length = spot.Images.length;
    if (currentImageIdx === length - 1) {
      setCurrentImageIdx(0);
    } else {
      setCurrentImageIdx((prevSate) => prevSate + 1);
    }
  };

  if (!spot) {
    return null;
  }

  return (
    <div>
      <h1>{spot.name}</h1>
      <button onClick={prevImg}>Prev Img</button>
      <img
        src={spot.Images[currentImageIdx].url}
        alt={`${spot.name} property`}
      />
      <button onClick={nextImg}>Next Img</button>
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
          {isformShown && <EditForm formShow={formShow} />}
        </div>
      )}
    </div>
  );
};

export default SingleSpot;
