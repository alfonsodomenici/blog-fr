import { html, render } from "./lib/lit-html.js";
import { Router } from "./lib/vaadin-router.js";
import { allPosts,deletePost } from "./postStore.js";

export default class PostList extends HTMLElement {

    constructor() {
        super();
    }

    getRoot() {
        return this;
        // return this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.loadAndRenderPosts();
    }

    disconnectedCallback() {
    }

    loadAndRenderPosts(){
        allPosts().then(data => {
            this.data = data;
            render(this.renderView(), this.getRoot());
        })
    }
    /*
    -------------------- eventi -------------------
    */

    onCreate(e) {
        e.preventDefault();
        Router.go(`/createPost`)
    }

    onEdit(e, id) {
        e.preventDefault();
        Router.go(`/posts/${id}`)
    }


    onDelete(e, id) {
        e.preventDefault(); 
        deletePost(id)
        .then(resp => {
            this.loadAndRenderPosts();
        });
        
    }

    onTestEvent(e){
        e.preventDefault(); 
       const evt = new CustomEvent('blog-event',{
            detail:{
                category: 'prova'
            },
            bubbles: true
        })
        document.dispatchEvent(evt);
    }

    /*
    --------------------render ---------------------
    */

    renderView() {
        return html`
            
            <h1 class="title has-text-centered">Tutti i posts</h1>
            
            <div class="list">
                ${this.data.map(post => this.renderPost(post))}
            </div>

            <button @click = ${e => this.onCreate(e)} class="button is-primary">Nuovo</button>
            <button @click = ${e => this.onTestEvent(e)} class="button is-primary">CustomEvent</button>
        `;
    }

    renderPost(post) {
        return html`
            <div class="list-item">
                <div class="list-item-content">
                    <div class="list-item-title">${post.title}</div>
                    <div class="list-item-description">${post.content}</div>
                </div>
                <div class="list-item-controls">
                    <div class="buttons">
                        <button class="button is-warning" @click = ${e => this.onEdit(e, post.id)}>
                            <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                        <button class="button is-danger" @click = ${e => this.onDelete(e, post.id)}>
                            <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                            </span>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define("post-list", PostList);