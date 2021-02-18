import React, { Component } from 'react';
import './Blog.css';
import Posts from '../Blog/Posts/Posts';
// import NewPost from './NewPost/NewPost';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// Link y NavLink es un component que sirve como <a></a> pero sin que la pagina recargue
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component {
   state = {
      auth: true
   }
   render() {
      return (
         <div className="Blog">
            <header>
               <nav>
                  <ul>
                     <li><NavLink activeClassName='my-active' activeStyle={{ color: '#fa923f' }} exact to="/posts">Posts</NavLink></li>
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
            <Switch>
               {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
               <Route path="/posts" component={Posts} />
               {/* <Route render={() => <h1>Not Found</h1>} /> */}
               <Redirect from='/' to='/posts' />
            </Switch>
         </div>
      );
   }
}

export default Blog;