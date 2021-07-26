import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createBookingForm } from "../../store/bookings";

const BookingForm = ({ formShow }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const data = {
      spotId: id,
      startDate,
      endDate,
    };

    dispatch(createBookingForm(data))
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
          Book Spot
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
