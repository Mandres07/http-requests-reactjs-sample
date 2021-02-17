import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
   state = {
      posts: []
   }

   postSelectedHandler = (id) => {
      this.setState({ selectedPostId: id });
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
      console.log(this.props);
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
            return <Post key={p.id} title={p.title} author={p.author} clicked={() => { this.postSelectedHandler(p.id) }} />;
         });
      }

      return (
         <section className="Posts">
            {posts}
         </section>
      );
   }
}

export default Posts;