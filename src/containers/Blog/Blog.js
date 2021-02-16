import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
// import axios from 'axios';
import axios from '../../axios';

class Blog extends Component {

   state = {
      posts: [],
      selectedPostId: null,
      error: false
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

   postSelectedHandler = (id) => {
      this.setState({ selectedPostId: id });
   }

   render() {
      let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
      if (!this.state.error) {
         posts = this.state.posts.map(p => {
            return <Post key={p.id} title={p.title} author={p.author} clicked={() => { this.postSelectedHandler(p.id) }} />;
         });
      }
      return (
         <div>
            <section className="Posts">
               {posts}
            </section>
            <section>
               <FullPost id={this.state.selectedPostId} />
            </section>
            <section>
               <NewPost />
            </section>
         </div>
      );
   }
}

export default Blog;