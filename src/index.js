import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

// import App from './components/app';
import reducers from './reducers';
import PostsList from './components/posts_list';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

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
        {/*Header*/}
        <Switch>
            {/*Reason we have /posts/:id as second route is, when user navigates to /posts/new
            and if /posts/:id is first route, new is matched against the :id wildcard and  
            react-router-dom loads /posts/:id instead of posts/new*/}
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
