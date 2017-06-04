import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { compose, setDisplayName, lifecycle, withState, withProps } from 'recompose'
import { getHelper } from './utils/requestHelper'

const addPostsState = compose(
    withState('posts', 'setPosts', []),
    withProps(({ setPosts }) => ({
        updatePosts: (posts) => setPosts(() => posts)
    }))
)

const enhancePosts = compose(
    addPostsState,
    setDisplayName('Posts'),
    lifecycle({
        componentWillMount: function () {
            getHelper('/posts').then((response) => {
                console.log(response)
                this.props.updatePosts(response.data)
            })
        }
    }),
)

const Posts = enhancePosts((props) => {
    return (
        <div>
            <pre>{JSON.stringify(props.posts, undefined, 2)}</pre>
        </div>
    )
})

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to joyfulreview!</h2>
                </div>
                <p className="App-intro">
                    reviewing things that bring us <code>JOY</code>
                </p>
                <Posts/>
            </div>
        );
    }
}

export default App;
