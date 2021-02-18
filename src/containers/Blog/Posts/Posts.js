import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import { Route } from 'react-router-dom';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
   state = {
      posts: []
   }

   postSelectedHandler = (id) => {
      // this.setState({ selectedPostId: id });
      // console.log(this.props);
      // this.props.history.push({ pathname: '/posts/' + id });
      this.props.history.push('/posts/' + id);
   }

   componentDidMount() {
      // fetch('https://jsonplaceholder.typicode.com/posts')
      //    .then(response => response.json())
      //    .then(data => {
      //       const posts = data.slice(0, 4);
      //       const updatedPost = posts.map(post => {
      //          return {
      //             ...post,
      //             author: 'Mandres07'
      //          }
      //       });
      //       this.setState({ posts: updatedPost });
      //    });
      axios.get('/posts')
         .then(response => {

            const posts = response.data.slice(0, 4);
            const updatedPost = posts.map(post => {
               return {
                  ...post,
                  author: 'Mandres07'
               }
            });
            this.setState({ posts: updatedPost });
         })
         .catch(err => {
            this.setState({ error: true });
         });
   }

   render() {
      let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
      if (!this.state.error) {
         posts = this.state.posts.map(p => {
            return (
               // <Link key={p.id} to={'/posts/' + p.id}>
               <Post key={p.id} title={p.title} author={p.author} clicked={() => { this.postSelectedHandler(p.id) }} />
               // </Link>
            );
         });
      }

      return (
         <div>
            <section className="Posts">
               {posts}
            </section>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
         </div>

      );
   }
}

export default Posts;