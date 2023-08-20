const UserInfo = ({ user, handleLogout }) => {
  //console.log("UserInfo.user.name", user.name);
  return (
    <p>
      {user.name} logged in 🎉
      <button id="logout-button" onClick={handleLogout}>
        Logout Yarr 👋
      </button>
    </p>
  );
};

export default UserInfo;
