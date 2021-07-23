import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import EditForm from "./EditForm";
import "./SingleSpot.css";

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
    <div className="single-spot__container">
      <h1>{spot.name}</h1>
      <div className="imgae-nav__container">
        <button onClick={prevImg} className="image__nav">
          <i className="fas fa-chevron-left fa-5x"></i>
        </button>
        <img
          src={spot.Images[currentImageIdx].url}
          alt={`${spot.name} property`}
          className="display-img"
        />
        <button onClick={nextImg} className="image__nav">
          <i className="fas fa-chevron-right fa-5x"></i>
        </button>
      </div>
      <div>
        Address:
        <span> {spot.city}, </span>
        <span>{spot.state}, </span>
        <span>{spot.country}</span>
      </div>
      <div>Price: ${spot.price}</div>
      {user && user.id === spot.userId && (
        <>
          <div className="buttons__container">
            <button onClick={handleEdit} className=" edit__button">
              Edit
            </button>
            <button onClick={handleDelete} className="delete__button">
              delete
            </button>
          </div>
          {isformShown && <EditForm formShow={formShow} />}
        </>
      )}
    </div>
  );
};

export default SingleSpot;
