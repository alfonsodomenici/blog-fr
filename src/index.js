import "./PostList.js";
import "./PostEdit.js";
import "./Menu.js";
import "./Home.js"
import { Router } from "./lib/vaadin-router.js";

const outlet = document.querySelector('main');
const router = new Router(outlet);

router.setRoutes([
    {path: '/',     component: 'blog-home'},
    {path: '/home',     component: 'blog-home'},
    {path: '/posts',     component: 'post-list'},
    {path: '/createPost',     component: 'post-edit'},
    {path: '/posts/:post',     component: 'post-edit'},
  ]);

export {router};