import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from 'redux-promise';

// import App from './components/app';
import reducers from './reducers';
import PostsList from './components/posts_list';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// class Hello extends Component {
//   render() {
//     return <div>Hello!</div>
//   }
// }

// class Goodbye extends Component {
//   render() {
//     return <div>Goodbye!</div>
//   }
// }

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/" component={PostsList} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
