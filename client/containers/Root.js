import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import HomeView from '../components/HomeView'
import FooView from '../components/FooView'
import NotFoundView from '../components/NotFoundView'
/**
 * Root is exported for conditional usage index.js.
 * It's not 'real' a container, BUT it's special because it enables us to use
 * vanilla Webpack HMR.
 */
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      {/* 'App' acts as a wrapper for the child components */}
      <Route path='/' component={App}>
        {/* IndexRoute is the initial component that is loaded,
            other routes are loaded according to the component
            property specified here */}
        <IndexRoute component={HomeView} />
        <Route path='foo' component={FooView} />
        <Route path='*' component={NotFoundView} />
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
