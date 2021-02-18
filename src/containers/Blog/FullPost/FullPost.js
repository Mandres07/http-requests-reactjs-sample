import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

   state = {
      post: null
   }

   componentDidMount() {
      this.loadData();
   }

   componentDidUpdate() {
      this.loadData();
   }

   loadData = () => {
      if (this.props.match.params.id) {
         // esta validacion verifica que los post no hayan sido cargados (primera vez entrando) o que el ultimo post cargado tenga otro id (nuevo post seleccionado)
         if (!this.state.post || (this.state.post.id !== +this.props.match.params.id)) {
            axios.get(`/posts/${this.props.match.params.id}`)
               .then(response => {
                  this.setState({ post: response.data });
               })
               .catch();
         }
      }
   }

   deletePostHandler = () => {
      axios.delete(`/posts/${this.props.match.params.id}`)
         .then(response => {
            console.log(response);
         });
   }

   render() {
      let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
      if (this.props.match.params.id) {
         post = <p style={{ textAlign: 'center' }}>Loading...</p>;
      }
      if (this.state.post) {
         post = (
            <div className="FullPost">
               <h1>{this.state.post.title}</h1>
               <p>{this.state.post.body}</p>
               <div className="Edit">
                  <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
               </div>
            </div>

         );
      }
      return post;
   }
}

export default FullPost;