import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useUser } from "../../contexts/User.context";
import { usePreferences } from "../../contexts/Preferences.context";

function Profile() {
  const { currentUser } = useUser();
  const { isLoading, setIsLoading } = usePreferences();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  if (!currentUser && !isLoading) {
    return <Redirect to="/login" />;
  }

  return <div>{!isLoading && "Profile"}</div>;
}

export default Profile;
