import { html, render } from "./lib/lit-html.js";
import { Router } from "./lib/vaadin-router.js";
import { router } from "./index.js";
import { findPost, updatePost, createPost } from "./postStore.js";

export default class PostEdit extends HTMLElement {

    constructor() {
        super();
    }

    getRoot() {
        return this;
    }

    connectedCallback() {
        const { location } = router;
        this.id = location.params.post ;
        if (this.id == "undefined") {
            console.log("create..")
            this.data = {
                category:'',
                title:'',
                content:''
            }
            render(this.renderView(), this.getRoot());
        } else {
            findPost(this.id)
                .then(data => {
                    this.data = data;
                    render(this.renderView(), this.getRoot());
                })
        }

    }

    onInputChange(e) {
        const { name, value } = e.target;
        this.data[name] = value;
    }

    onSave(e) {
        e.preventDefault();
        if (this.id === "undefined") {
            createPost(this.data)
                .then(_ => {
                    Router.go(`/posts/`);
                })
        } else {
            updatePost(this.id, this.data)
                .then(_ => {
                    Router.go(`/posts/`);
                })
        }

    }

    onCancel(e) {
        e.preventDefault();
        Router.go(`/posts/`);
    }

    renderView() {
        return html`
           <form>
                <div class="field">
                    <label class="label">Category</label>
                    <div class="control">
                        <input class="input" type="text" @change=${e => this.onInputChange(e)} name="category" .value=${this.data.category} placeholder="categoria...">
                    </div>
                </div>
         
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input" type="text" name="title" @change=${e => this.onInputChange(e)} .value=${this.data.title} placeholder="titolo...">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Testo</label>
                    <div class="control">
                        <textarea class="textarea" name="content" @change=${e => this.onInputChange(e)} .value=${this.data.content} placeholder="testo..."></textarea>
                    </div>
                </div>
         
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" @click = ${e => this.onSave(e)}>Save</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" @click = ${e => this.onCancel(e)}>Cancel</button>
                    </div>
                </div>
           </form>
        `;
    }
}
customElements.define("post-edit", PostEdit);