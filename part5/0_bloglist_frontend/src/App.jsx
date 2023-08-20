import { useState, useEffect, useRef } from "react";
import Bloglist from "./components/Bloglist";
import blogService from "./services/blogs";
import loginService from "./services/login";
import localStorageService from "./services/localStorage";
import Messager from "./components/Messager";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import AddBlog from "./components/AddBlog";
import helpers from "./utils/helpers";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [messageColor, setMessageColor] = useState(null);

  const addBlogRef = useRef();
  useEffect(() => {
    //console.log("app.useEffect run");
    const storedUser = async () => {
      const userData = await localStorageService.getFromLocal("user");
      if (userData) {
        setUser(userData);
        const gotBlogs = await blogService.getAll(userData);
        setBlogs(helpers.blogSort(gotBlogs));
        //console.log("setUserFromStorage", true);
      } else {
        //console.log("setUserFromStorage", false);
      }
    };
    storedUser();
  }, []);

  const messageHelper = (message, color) => {
    if (color) {
      setMessageColor(color);
    }
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
      setMessageColor(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      localStorageService.saveToLocal("user", user);
      setUsername("");
      setPassword("");
      const gotBlogs = await blogService.getAll(user);
      setBlogs(helpers.blogSort(gotBlogs));
      //console.log("app.user", user);
    } catch (exception) {
      messageHelper(
        "😔 no can do with that key, find a betterRR one (wrong username or password)"
      );
      setUsername("");
      setPassword("");
    }
  };
  const handleLogout = () => {
    //console.log("logging out");
    try {
      localStorageService.clearLocal();
      setUser(null);
      setBlogs([]);
    } catch (error) {
      //console.log("logging out.error", error);
    }
  };
  const addBlog = async (newBlog) => {
    console.log("addBlog.newBlog", newBlog);
    try {
      const saveBlogResponse = await blogService.saveNewBlog(user, newBlog);
      console.log("addBlog.newBlog.saveBlogResponse", saveBlogResponse);
      messageHelper(`Blog ${newBlog.title} created`, "green");
      setBlogs(helpers.blogSort(blogs.concat(saveBlogResponse)));
    } catch (exception) {
      messageHelper(`😔 some errRRor in creating blog`, "red");
    }
    addBlogRef.current.toggleAddBlogVisibility();
  };

  const addLike = (editedBlog) => {
    console.log("addLike.editedBlog", editedBlog);
    const blogsToUpdate = blogs.map((a) => Object.assign({}, a));
    blogsToUpdate[
      blogsToUpdate.findIndex((blog) => blog.id === editedBlog.id)
    ].likes = editedBlog.likes;
    console.log("addLike.blogsToUpdate.after", blogsToUpdate);
    try {
      blogService.addBlogLike(user, editedBlog);
    } catch (exception) {
      messageHelper(`😔 some errRRor in likeing blog`, "red");
      console.log(exception);
    }
    messageHelper(`Blog ${editedBlog.title} liked`, "green");
    setBlogs(helpers.blogSort(blogsToUpdate));
  };

  const removeBlog = (blogToRemove) => {
    //console.log("removeBlog.blogToRemove", blogToRemove);
    if (
      window.confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author} `)
    ) {
      const newBlogs = helpers.removeOneBlog(blogs, blogToRemove);
      //console.log("removeBlog.blogs", blogs);
      //console.log("removeBlog.newBlogs", newBlogs);
      try {
        console.log(
          "removeBlogesponse",
          blogService.removeBlog(user, blogToRemove)
        );
      } catch (exception) {
        messageHelper(`😔 some errRRor in deleting blog bRrRRo`, "red");
        console.log(exception);
      }

      setBlogs(newBlogs);
    }
  };

  return (
    <div>
      <Messager message={message} color={messageColor} />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user && (
        <>
          <UserInfo user={user} handleLogout={handleLogout} />
          <AddBlog ref={addBlogRef} addBlog={addBlog} />
          <Bloglist
            blogs={blogs}
            addLike={addLike}
            removeBlog={removeBlog}
            user={user}
          />
        </>
      )}
    </div>
  );
};

export default App;
