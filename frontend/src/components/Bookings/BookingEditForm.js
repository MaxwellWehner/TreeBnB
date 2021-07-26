import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editBookingForm } from "../../store/bookings";

const BookingEditForm = ({ formShow }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const prevbooking = useSelector((state) => Object.values(state.bookings)[0]);

  const [startDate, setStartDate] = useState(
    `${prevbooking.startDate.slice(0, 4)}-${prevbooking.startDate.slice(
      5,
      7
    )}-${prevbooking.startDate.slice(8, 10)}`
  );
  const [endDate, setEndDate] = useState(
    `${prevbooking.endDate.slice(0, 4)}-${prevbooking.endDate.slice(
      5,
      7
    )}-${prevbooking.endDate.slice(8, 10)}`
  );
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const data = {
      spotId: id,
      startDate,
      endDate,
    };

    dispatch(editBookingForm(data, prevbooking.id))
      .then(() => formShow())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  return (
    <div className="form__container">
      <form onSubmit={handleSubmit} className="signup__form">
        {errors.length > 0 && (
          <ul className="errors">
            Please fix the following errors:
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit" className="submit">
          Submit Edit
        </button>
      </form>
    </div>
  );
};

export default BookingEditForm;
