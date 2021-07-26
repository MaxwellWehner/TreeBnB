import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import { deleteBookingThunk, getOneBooking } from "../../store/bookings";
import EditForm from "./EditForm";
import BookingForm from "../Bookings/BookingForm";
import "./SingleSpot.css";

const SingleSpot = () => {
  const { id } = useParams();

  const spot = useSelector((state) => state.spots[id]);
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => Object.values(state.bookings));

  const [isformShown, setIsFormShown] = useState(false);
  const [isOriginalBookingShown, setisOriginalBookingShown] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOneSpot(id));
    dispatch(getOneBooking(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (bookings.length > 0) {
      bookings.filter((booking) => {
        if (booking.spotId === id) {
          return true;
        } else {
          return false;
        }
      });
    }
  }, [bookings, id]);

  const formShow = () => {
    setIsFormShown((prevState) => !prevState);
  };

  const formShowForBooking = () => {
    setisOriginalBookingShown((prevState) => !prevState);
  };

  const handleEdit = () => {
    setIsFormShown((prevState) => !prevState);
  };

  const handleDelete = () => {
    dispatch(deleteSpotThunk(id));
    history.push("/");
  };

  const handleDeleteForBooking = () => {
    dispatch(deleteBookingThunk(bookings[0].id));
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

  const handleBookingSpot = () => {
    setisOriginalBookingShown((prevSate) => !prevSate);
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
      {bookings.length > 0 && bookings[0].spotId === id && (
        <div>{JSON.stringify(bookings[0])}</div>
      )}
      {
        //for a non owner to book that spot if not booked
        user && user.id !== spot.userId && bookings.length === 0 && (
          <>
            <button onClick={handleBookingSpot}>Book this Spot</button>
            {isOriginalBookingShown && (
              <BookingForm formShow={formShowForBooking} />
            )}
          </>
        )
      }
      {
        //if the current user made the booking for that spot
        user &&
          user.id !== spot.userId &&
          bookings.length > 0 &&
          user.id === bookings[0].userId && (
            <div className="buttons__container">
              <button className=" edit__button">Edit Booking</button>
              <button
                className="delete__button"
                onClick={handleDeleteForBooking}
              >
                Delete Booking
              </button>
            </div>
          )
      }
      {
        //if the spot is booked and the user is not the booker
        bookings.length > 0 && <div className="boooked">Booked</div>
      }
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
