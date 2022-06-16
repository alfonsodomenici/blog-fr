import configData from "./config.js";

const url = `${configData.baseurl}/posts`;
const allPosts = async () => {
    const resp = await fetch(url)
    return resp.json();
}

const findPost = async (postId) => {
    const resp = await fetch(`${url}/${postId}`)
    return resp.json();
}

const updatePost = async (postId,data) => {
    const resp = await fetch(`${url}/${postId}`,{
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached,
        body: JSON.stringify(data)
    })
    return find(postId)
}

export { allPosts, findPost, updatePost };