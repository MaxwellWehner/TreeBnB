import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Spots from "./components/Spots";
import Home from "./components/Home";
import SingleSpot from "./components/Spots/SingleSpot";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateForm from "./components/Spots/CreateForm";
import MyBookings from "./components/Bookings";
import Footer from "./components/Navigation/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
            <Spots />
          </Route>
          <Route exact path="/spots">
            <Spots />
          </Route>
          <Route path="/spots/create">
            <CreateForm />
          </Route>
          <Route path="/spots/:id">
            <SingleSpot />
          </Route>
          <Route path="/:userId/bookings">
            <MyBookings />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route>404 page not found</Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
