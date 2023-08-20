import { useState, useEffect } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, addLike, removeBlog, user }) => {
  //console.log("blog", blog);
  //console.log("blog.user", JSON.stringify(user));
  const [blogOpen, setBlogOpen] = useState(false);
  const [blogCopy, setBlogCopy] = useState(Object.assign({}, blog));
  const [ownsBlog, setOwnsBlog] = useState(false);

  console.log(ownsBlog);
  useEffect(() => {
    console.log("blog.useEffect.ownsBlog", ownsBlog);
    isUserOwner();
  }, []);

  const toggleOpen = () => {
    isUserOwner();
    setBlogOpen(!blogOpen);
  };

  const isUserOwner = () => {
    console.log("blog.user.username", user.username);
    console.log("blog.blogCopy.user", blogCopy.user);
    if (
      user.username &&
      blogCopy.user &&
      user.username === blogCopy.user.username
    ) {
      setOwnsBlog(true);
    }
  };

  const handleAddLike = (event) => {
    event.stopPropagation();
    let updatedBlog = Object.assign({}, blogCopy);
    updatedBlog.likes = updatedBlog.likes + 1;
    console.log("blog.updatedBlog", updatedBlog);
    console.log("blog.blog", blog);
    setBlogCopy(updatedBlog);
    addLike(updatedBlog);
  };
  const handleRemoveBlog = (event) => {
    event.stopPropagation();
    removeBlog(blogCopy);
  };
  const blogStyle = {
    paddingTop: 6,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    margin: 2,
  };
  const openBlog = () => (
    <div
      style={blogStyle}
      onClick={() => {
        toggleOpen();
      }}
    >
      {blogCopy.title}{" "}
      <button onClick={() => setBlogOpen(false)}>📘 Close</button>
      <br />
      <a href={blog.url}>{blogCopy.url}</a>
      <br />
      likes {blogCopy.likes}{" "}
      <button onClick={(e) => handleAddLike(e)}>👍 like</button>
      <br />
      by {blogCopy.author}
      {ownsBlog && (
        <>
          <br /> <button onClick={(e) => handleRemoveBlog(e)}>🗑️ remove</button>
        </>
      )}
    </div>
  );
  const closedBlog = () => (
    <div
      style={blogStyle}
      onClick={() => {
        toggleOpen();
      }}
    >
      {blogCopy.title} by {blogCopy.author}{" "}
      <button onClick={() => setBlogOpen(true)}>📖 Open</button>
    </div>
  );

  return (
    <>
      {blogOpen && openBlog()}
      {!blogOpen && closedBlog()}
    </>
  );
};

Blog.PropTypes = {
  blog: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default Blog;
