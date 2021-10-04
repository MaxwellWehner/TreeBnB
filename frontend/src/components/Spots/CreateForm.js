import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSpotForm } from "../../store/spots";

function CreateForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
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

    return dispatch(createSpotForm(newSpot))
      .then((returnedSpot) => history.push(`/spots/${returnedSpot.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
		<div className="form__container main-content">
			<form onSubmit={handleSubmit} className="signup__form">
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
					Create a Spot
				</button>
			</form>
		</div>
  );
}

export default CreateForm;
