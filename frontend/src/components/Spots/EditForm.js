import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { editSpotForm } from "../../store/spots";

function EditForm({ formShow }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const defaultSpotVals = useSelector((state) => state.spots[id]);
  const [address, setAddress] = useState(defaultSpotVals.address);
  const [name, setName] = useState(defaultSpotVals.name);
  const [city, setCity] = useState(defaultSpotVals.city);
  const [country, setCountry] = useState(defaultSpotVals.country);
  const [state, setState] = useState(defaultSpotVals.state);
  const [price, setPrice] = useState(defaultSpotVals.price);
  const [image, setImage] = useState(defaultSpotVals.Images[0].url);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/login" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const newSpot = {
      address,
      city,
      state,
      country,
      price,
      name,
      image,
    };

    dispatch(editSpotForm(newSpot, id))
      .then(() => formShow())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="form__container">
      <form
        onSubmit={handleSubmit}
        className="signup__form"
        id="edit-spot-form"
      >
        {errors.length > 0 && (
          <ul className="errors">
            Please fix the following errors:
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label>State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label>Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Image Url</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit" className="submit">
          Edit Spot
        </button>
      </form>
    </div>
  );
}

export default EditForm;
