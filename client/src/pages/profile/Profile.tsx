import { useEffect, useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { useUser } from "../../contexts/User.context";
import { usePreferences } from "../../contexts/Preferences.context";
import { User } from "../../types/types";
import serverAPI from "../../api/serverApi";
import avatarIMG from "../../assets/images/avatar.jpg";
import { StyledProfileContainer } from "./StyledProfileContainer";

function Profile({ match }: any) {
  const [user, setUser] = useState<User>();
  const [notFound, setNotFound] = useState(false);
  const { currentUser } = useUser();
  const { isLoading, setIsLoading } = usePreferences();

  useEffect(() => {
    setIsLoading(true);
    if (match.params.id) {
      (async function getUser() {
        try {
          const {
            data: { user },
          } = await serverAPI().get(`/users/getUserById/${match.params.id}`);
          setUser(user);
          setNotFound(false);
        } catch (err: any) {
          setNotFound(true);
          setIsLoading(false);
          console.log(err.message);
        }
      })();
    }
  }, [match.params.id, setIsLoading]);

  useEffect(() => {
    if (currentUser && !match.params.id) {
      setUser(currentUser);
      setNotFound(false);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading, currentUser, match.params.id]);

  const getUserJSX = () => {
    if (!user) return;
    return (
      <>
        <h2>{user.name}</h2>
        <img src={user.img ?? avatarIMG} alt={user.name} />
        {user.from && <div>From: {user.from}</div>}
        {user.age && <div>Age: {user.age}</div>}
        {user.bio && <p>Bio: {user.bio}</p>}
        <div>{user.helper ? "Here to help!" : "Looking for help"}</div>
        {user._id === currentUser?._id && (
          <div className="editOption">
            <NavLink to="/EditProfile">Edit</NavLink>
          </div>
        )}
      </>
    );
  };

  if (!currentUser && !isLoading) {
    return <Redirect to="/login" />;
  }

  if (notFound && !isLoading) return <div>User Not Found!</div>;

  return !isLoading ? (
    <StyledProfileContainer>
      <div className="userInfo">{getUserJSX()}</div>
      <div className="reviews">
        <h1>
          {user?._id === currentUser?._id
            ? "My Reviews"
            : `${user?.name}'s Reviews`}
        </h1>
      </div>
    </StyledProfileContainer>
  ) : (
    <></>
  );
}

export default Profile;
