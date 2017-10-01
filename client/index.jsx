import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux';
import store from './store/store';

const newHistory = createBrowserHistory();

import Home from './components/Home';

ReactDOM.render(
    <Provider store={store}>
        <Router history={newHistory}>
            <Route path="/" component={Home} />
        </Router>
    </Provider>
    , document.getElementById('root')
)