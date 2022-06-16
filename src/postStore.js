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
        method: 'PATCH',
        body: JSON.stringify(data)
    })
    return find(postId)
}

export { allPosts, findPost, updatePost };