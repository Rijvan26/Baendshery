import React from "react";
import { Link } from "react-router";
import "../suggesteduser.scss";
import { usePost } from "../../post/hook/usePost";
import useAuth from "../../auth/hooks/userAuth";
const SuggestedUsers = ({ users }) => {
  const { handleFollowUser, handleUnFollowUser } = usePost();
  const { updateFollowState } = useAuth();

  if (!users || users.length === 0) {
    return <p>No suggestions</p>;
  }

  console.log(users);
  return (
    <main className="suggested-main">
      <div className="suggested-user-container">
        <h3 className="suggestion-heading">Suggestion for you</h3>

        {users.map((user) => (
          <div key={user.username} className="suggested-user">
            <img className="profile-pic" src={user.profilePic} alt="" />

            <p>{user.username}</p>
            <button
              className="follow-btn"
              onClick={async () => {
                if (user.isFollowing) {
                  await handleUnFollowUser(user.username);
                  updateFollowState(user.username, false);
                } else {
                  await handleFollowUser(user.username);
                  updateFollowState(user.username, true);
                }
              }}
            >
              {user.isFollowing ? "unfollow" : "follow"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SuggestedUsers;
