import { useState } from "react";
import { useUser } from "../../contexts/User.context";
import serverAPI from "../../api/serverApi";
import { headerOptions, Review } from "../../types/types";
import { StyledMakeRequest } from "../../pages/makeRequest/StyledMakeRequest";
import { StyledInputContainer } from "../customInput/styledInputContainer";
import { StyledButton } from "../styledButton/StyledButton";

function ReviewPopup({ user, close, handleAdd }: any) {
  const [success, setSuccess] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [error, setError] = useState("");
  const { currentUser, token } = useUser();

  const postReview = async () => {
    if (reviewContent === "") {
      return setError("Cannot post an empty review!");
    }
    const options: headerOptions = {
      headers: {
        Authorization: token!,
      },
    };
    try {
      const { data } = await serverAPI(options).post(
        `/reviews/addReview/${user?._id}`,
        {
          userID: currentUser?._id,
          name: currentUser?.name,
          content: reviewContent,
          time: new Date().toLocaleString(),
        }
      );
      updateReviewPermission(options, data.addedReview);
    } catch (err: any) {
      setError(err.response.data.message || "Error!");
      console.log(err.message);
    }
  };

  const updateReviewPermission = async (
    options: headerOptions,
    addedReview: Review
  ) => {
    try {
      await serverAPI(options).put("/users/updateUsersToReview", {
        toUser: user?._id,
        add: false,
      });
      handleAdd(addedReview);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response.data.message || "Error!");
      console.log(err.message);
    }
  };

  return (
    <StyledMakeRequest>
      <div className="smallContainer">
        {!success && (
          <>
            <StyledInputContainer>
              <textarea
                id="description"
                onChange={(e) => setReviewContent(e.target.value)}
                value={reviewContent}
              />
              <label
                className={reviewContent && "filled"}
                htmlFor="description"
              >
                Describe your experience...
              </label>
            </StyledInputContainer>
            <div className="buttons">
              <StyledButton
                onClick={() => {
                  close(false);
                  setError("");
                }}
              >
                Cancel
              </StyledButton>
              <StyledButton onClick={postReview}>Post!</StyledButton>
            </div>
            <div className="error">{error}</div>
          </>
        )}
        {success && (
          <div className="closePopup">
            <h3>Review has been posted!</h3>
            <StyledButton onClick={() => close(false)}>Close</StyledButton>
          </div>
        )}
      </div>
    </StyledMakeRequest>
  );
}

export default ReviewPopup;
