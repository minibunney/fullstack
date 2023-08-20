const blogSort = (blogs) => {
    const freshBlogCopy = blogs.map((a) => Object.assign({}, a))
    freshBlogCopy.sort((a, b) => {
        let aLikes = a.likes;
        let bLikes = b.likes;
        if (aLikes > bLikes) return -1;
        if (aLikes < bLikes) return 1;
        return 0;
    })
    return freshBlogCopy
}
const removeOneBlog = (blogs, blogToRemove) => {
    const newBlogs = blogs.filter(blog => {
        return blog.id !== blogToRemove.id
    })
    return newBlogs
}
export default { blogSort, removeOneBlog }