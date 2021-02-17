import React, { Component } from 'react';
import './Blog.css';
import Posts from '../Blog/Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost';
import { Route, NavLink } from 'react-router-dom';
// Link y NavLink es un component que sirve como <a></a> pero sin que la pagina recargue

class Blog extends Component {

   render() {
      return (
         <div className="Blog">
            <header>
               <nav>
                  <ul>
                     <li><NavLink activeClassName='my-active' activeStyle={{ color: '#fa923f' }} to="/" exact>Home</NavLink></li>
                     <li><NavLink to={{
                        pathname: '/new-post',
                        hash: '#submit',
                        search: '?submit=true'
                     }}>New Post</NavLink></li>
                  </ul>
               </nav>
            </header>
            {/*
            Se puede usar el prop render o el prop component 
            <Route path="/" exact render={() => <Posts />} />
            <Route path="/new-post" exact render={() => <NewPost />} /> 
            */}

            <Route path="/" exact component={Posts} />
            <Route path="/new-post" component={NewPost} />
         </div>
      );
   }
}

export default Blog;