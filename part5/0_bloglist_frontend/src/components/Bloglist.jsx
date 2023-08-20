import Blog from "./Blog";
const Bloglist = ({ blogs, addLike, removeBlog, user }) => {
  //console.log("bloglist", blogs);
  return (
    <>
      <h2>Blogs 📄 📄📄📄</h2>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </>
  );
};

export default Bloglist;
