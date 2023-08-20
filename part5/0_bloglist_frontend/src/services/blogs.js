import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const tokenHelper = (user) => {
  try {
    const token = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
    return token
  } catch (error) {
    console.log("blogs.tokenHelper.error", error)
  }
}

const getAll = async (user) => {
  //console.log("services.blogs.getAll", user)
  const response = await axios.get(baseUrl, tokenHelper(user))
  return response.data
}
const saveNewBlog = async (user, newBlog) => {
  console.log("services.blogs.saveNewBlog", newBlog)
  try {
    const response = await axios.post(baseUrl, newBlog, tokenHelper(user))
    return response.data
  } catch (error) {
    console.log("services.blogs.saveNewBlog.error", error)
    throw error
  }
}
const addBlogLike = async (user, blog) => {
  console.log("services.blogs.addBlogLike", blog)
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, tokenHelper(user))
    return response.data
  } catch (error) {
    console.log("services.blogs.addBlogLike.error", error)
    throw error
  }
}
const removeBlog = async (user, blog) => {
  console.log("services.blogs.addBlogLike", blog)
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, tokenHelper(user))
    return response.data
  } catch (error) {
    console.log("services.blogs.addBlogLike.error", error)
    throw error
  }
}

export default { getAll, saveNewBlog, addBlogLike, removeBlog }