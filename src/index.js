import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './index.css';
import Auth from './client/components/auth-page';
import Check from './client/components/login-check';
import Main from './client/components/main-page';
import PokemonCard from './client/components/card-page';
import NotFound from './client/components/404';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/cards/1" />
          </Route>
          <Route exact path="/login" component={Auth} />
          <Route exact path="/login/check" component={Check} />
          <Route exact path="/cards/:currentPage" component={Main} />
          <Route
            exact
            path="/cards/:typeSelected/:currentPage"
            component={Main}
          />
          <Route
            exact
            path="/cards//:subtypeSelected/:currentPage"
            component={Main}
          />
          <Route
            exact
            path="/cards/:typeSelected/:subtypeSelected/:currentPage"
            component={Main}
          />
          <Route exact path="/pokemon/:pokemonId" component={PokemonCard} />
          <Route component={() => <NotFound />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
