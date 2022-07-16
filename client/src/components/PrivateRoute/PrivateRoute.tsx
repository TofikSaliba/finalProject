import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { usePreferences } from "../../contexts/Preferences.context";
import { useUser } from "../../contexts/User.context";

function PrivateRoute({ component: Component, ...rest }: any) {
  const { currentUser } = useUser();
  const { setIsLoading } = usePreferences();
  const [wait, setWait] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setWait(true);
    }, 500);
  }, [setIsLoading]);

  return wait ? (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Login" />
        );
      }}
    />
  ) : (
    <></>
  );
}

export default PrivateRoute;
