import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/User.context";
import { usePreferences } from "../../contexts/Preferences.context";
import { User, Review, headerOptions } from "../../types/types";
import serverAPI from "../../api/serverApi";
import avatarIMG from "../../assets/images/avatar.jpg";
import { StyledProfileContainer } from "./StyledProfileContainer";
import { StyledButton } from "../../components/styledButton/StyledButton";
import ReviewPopup from "../../components/reviewPopup/ReviewPopup";
import { StyledReviewCard } from "./StyledReviewCard";
import { useSocket } from "../../contexts/Socket.context";
import { useChat } from "../../contexts/Chat.context";

function Profile({ match }: any) {
  const [user, setUser] = useState<User>();
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [addReviewPopup, setAddReviewPopup] = useState(false);

  const { currentUser, token, updateUsersToReview } = useUser();
  const { isLoading, setIsLoading } = usePreferences();
  const { socket } = useSocket();
  const { startConversation } = useChat();

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
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [match.params.id, setIsLoading]);

  useEffect(() => {
    if (currentUser && !match.params.id) {
      setUser(currentUser);
      setNotFound(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [setIsLoading, currentUser, match.params.id]);

  useEffect(() => {
    if (user) {
      (async function () {
        const options: headerOptions = {
          headers: {
            Authorization: token!,
          },
        };
        try {
          const { data } = await serverAPI(options).get(
            `/reviews/getUserReviews/${user._id}`
          );
          setUserReviews(data.reviews.reviews);
        } catch (err: any) {
          console.log(err.message);
        }
      })();
    }
  }, [user, token]);

  const getUserJSX = () => {
    if (!user) return;
    return (
      <>
        <h2>{user.name}</h2>
        <img
          src={!user.img || user.img === "" ? avatarIMG : user.img}
          alt={user.name}
        />
        {user.age && <div>Age: {user.age}</div>}
        <div>{user.helper ? "Here to help!" : "Looking for help"}</div>
        {user.bio && <p>Bio: {user.bio}</p>}
        {user._id === currentUser?._id ? (
          <div className="editOption">
            <NavLink to="/editProfile">
              <StyledButton>Edit</StyledButton>
            </NavLink>
          </div>
        ) : (
          <div className="sendMessage">
            <NavLink to="/chat">
              <StyledButton
                onClick={() => startConversation(user?._id, user?.name)}
              >
                Message
              </StyledButton>
            </NavLink>
          </div>
        )}
      </>
    );
  };

  const getUserReviewsJSX = () => {
    return userReviews.map((review) => {
      return (
        <StyledReviewCard key={review._id}>
          <div className="reviewHeader">
            <NavLink to={`/profile/${review.userID}`}>
              <span>{review.name}</span>
            </NavLink>
            <span>{review.time}</span>
          </div>
          <p className="reviewContent">{review.content}</p>
        </StyledReviewCard>
      );
    });
  };

  const handleReviewAddRerender = (addedReview: Review) => {
    setUserReviews((prev) => [addedReview, ...prev]);
    updateUsersToReview();
    socket.emit("reviewNotification", { toID: user?._id });
  };

  if (notFound && !isLoading) return <div>User Not Found!</div>;

  return !isLoading ? (
    <StyledProfileContainer>
      {addReviewPopup && (
        <ReviewPopup
          handleAdd={handleReviewAddRerender}
          user={user}
          close={setAddReviewPopup}
        />
      )}
      <div className="userInfo">{getUserJSX()}</div>
      <div className="reviews">
        <h1>
          {user?._id === currentUser?._id
            ? "My Reviews"
            : `${user?.name}'s Reviews`}
        </h1>
        {user?._id !== currentUser?._id &&
          currentUser?.usersToReview.includes(user?._id!) && (
            <StyledButton onClick={() => setAddReviewPopup(true)}>
              Add Review
            </StyledButton>
          )}
        {getUserReviewsJSX()}
      </div>
    </StyledProfileContainer>
  ) : (
    <></>
  );
}

export default Profile;
