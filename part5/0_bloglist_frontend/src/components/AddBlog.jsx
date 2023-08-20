import { useState, useImperativeHandle, forwardRef } from "react";

const AddBlog = forwardRef(({ addBlog }, ref) => {
  const [addBlogVisible, setAddBlogVisible] = useState(false);
  const emptyBlog = { title: "", author: "", url: "" };
  const [newBlogObj, setNewBlogObj] = useState(emptyBlog);
  const whiskeyTango = () => {
    console.log("whiskyTango");
  };
  const toggleAddBlogVisibility = () => {
    setAddBlogVisible(!addBlogVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleAddBlogVisibility,
    };
  });

  const newBlog = (event) => {
    event.preventDefault();
    addBlog(newBlogObj);
    setNewBlogObj(emptyBlog);
  };

  const hideStyle = { display: addBlogVisible ? "none" : "" };
  const showStyle = { display: addBlogVisible ? "" : "none" };
  return (
    <>
      <div style={hideStyle}>
        <button
          id="createNewBlog-button"
          onClick={() => setAddBlogVisible(true)}
        >
          Create new blog 📝
        </button>
      </div>
      <div style={showStyle}>
        <h2>Create new blog 📝</h2>
        <form>
          <div>
            title:
            <input
              type="text"
              id="newBlogTitle"
              value={newBlogObj.title}
              name="Title"
              onChange={({ target }) =>
                setNewBlogObj({ ...newBlogObj, title: target.value })
              }
              autoComplete="off"
            />
          </div>
          <div>
            author:
            <input
              type="text"
              id="newBlogAuthor"
              value={newBlogObj.author}
              name="Author"
              onChange={({ target }) =>
                setNewBlogObj({ ...newBlogObj, author: target.value })
              }
              autoComplete="off"
            />
          </div>
          <div>
            url:
            <input
              type="text"
              id="newBlogUrl"
              value={newBlogObj.url}
              name="Url"
              onChange={({ target }) =>
                setNewBlogObj({ ...newBlogObj, url: target.value })
              }
              autoComplete="off"
            />
          </div>
          <button id="saveNewBlog-button" onClick={newBlog}>
            💾 save
          </button>
        </form>
        <button onClick={() => setAddBlogVisible(false)}>↩️ Cancel</button>
      </div>
    </>
  );
});

export default AddBlog;
