import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import Login from "components/Login";
import PrivateRoute from "components/PrivateRoute";
import { auth } from "utils/nhost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NhostAuthProvider, NhostApolloProvider } from "react-nhost";

ReactDOM.render(
  <React.StrictMode>
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider
        auth={auth}
        gql_endpoint="https://hasura-zgp96xwz.nhost.app/v1/graphql"
      >
        <Router>
          <Switch>
            <PrivateRoute exact path="/">
              <App />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </NhostApolloProvider>
    </NhostAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
