import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        //even though we have access to post in this.props.post, we are not using this.props.post.id
        //instead we are fetching the id from url params using this.props.match.params
        //reason being, sometimes the post is still being loaded and it is wrong approach 
        //to expect the post is existing in the component state. Better get id from url 
        //than expect post exists(or already loaded) and available for component, which cannot be always true
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/" className="btn btn-primary">Back to Posts</Link>
                    <button
                        className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete Post
                        </button>
                </div>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>
                    {post.content}
                </p>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { posts } = state;
    return { post: posts[ownProps.match.params.id] };
}


export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);