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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
