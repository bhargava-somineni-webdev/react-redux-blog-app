import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';


class PostsList extends Component {
  componentDidMount() {
    //in weather app tutorial, we got the list of cities when search bar is submitted
    //so we didnt need a lifecycle method that is componentDidMount(), but here we need to fetch the 
    //posts data when our component is loaded and didMount is the best way.
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a post
         </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()} 
        </ul>
      </div>
      //if our posts were an array instead of an object we would have called the map function directly
       //on our this.props.posts similar to weather app tutorial inside weather_list.js. 
       //But since posts is made as an array, we instead use 
       //lodash map function on the posts object inside renderPosts
    );

  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
//we can use mapDipatch instead of writing 
//{fetchPosts : fecthPosts}={fetchPosts} with connect here directly. 
//But this is just another shortcut instead of mapDispatch