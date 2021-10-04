import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import InfoDocPage from "./pages/info-doc";
import Timelog from "./pages/timelog";

const App = (props) => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/:groupPath/:repo"
        component={({ match }) => (
          <Timelog
            service={props.service}
            groupPath={match.params.groupPath}
            repo={match.params.repo}
          />
        )}
      />
      <Route path="/infodoc" exact component={InfoDocPage} />
      <Route
        path="/:groupPath"
        component={({ match }) => (
          <Timelog service={props.service} groupPath={match.params.groupPath} />
        )}
      />
      <Route path="/" exact component={HomePage} />
      <Route component={ErrorPage} />
    </Switch>
  </BrowserRouter>
);
export default App;
